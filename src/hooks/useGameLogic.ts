import { useState, useEffect } from "react";
import { CharacterData } from "../utils/getCharacterData";
import { CharacterType, PositionType } from "../types/characterType";

const positions: PositionType[] = [
  { id: "window-1", x: 16, y: 49, angle: 0 },
  { id: "window-2", x: 33, y: 49, angle: 0 },
  { id: "window-3", x: 44, y: 49, angle: 0 },
  { id: "window-4", x: 55, y: 49, angle: 0 },
  { id: "window-5", x: 67, y: 49, angle: 0 },
  { id: "bus-left", x: -2, y: 55, angle: -45 },
  { id: "bus-right", x: 93, y: 58, angle: 45 },
  { id: "bush-left", x: 13, y: 67, angle: 0 },
  { id: "bush-right", x: 76, y: 70, angle: 0 },
];

export function useGameLogic(
  maxCharacters: number,
  spawnInterval: number,
  startGame: boolean,
  goodCharacterProbability: number
) {
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    if (startGame || gameOver) return;

    const interval = setInterval(() => {
      spawnRandomCharacter();
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [characters, gameOver, startGame]);

  function spawnRandomCharacter() {
    if (characters.length >= maxCharacters || gameOver) return;

    const validIds = Object.keys(CharacterData) as Array<keyof typeof CharacterData>; // Giltiga id
    const availablePositions = positions.filter(
      (pos) => validIds.includes(pos.id) && !characters.some((char) => char.id === pos.id)
    );

    if (availablePositions.length === 0) return;

    const randomPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const randomType = Math.random() < goodCharacterProbability ? "good" : "evil";

    const newCharacter: CharacterType = {
      type: randomType,
      x: randomPosition.x,
      y: randomPosition.y,
      id: randomPosition.id,
      clickedCharacter: false,
      angle: randomPosition.angle,
      score: randomType === "evil" ? 10 : 0,
      animation: randomPosition.id.includes("window") ? "slide-in" : "fade-in",
    };
    setCharacters((prev) => [...prev, newCharacter]);

    // Ta bort karaktären efter 2 sekunder
    setTimeout(() => {
      setCharacters((prev) => prev.filter((char) => char.id !== newCharacter.id));
    }, 22000);
  }

  function handleCharacterClick(character: CharacterType) {
    // Så att man inte ska kunna klicka flera gånger på samma karaktär.
    if (character.clickedCharacter) {
      return;
    }

    if (character.type === "good") {
      setGameOver(true);
    } else if (character.type === "evil") {
      setScore((prev) => prev + character.score);
    }

    setCharacters((prev) =>
      prev.map((char) => (char.id === character.id ? { ...char, clickedCharacter: true } : char))
    );
  }

  // Återställer spelplanen
  function resetGame() {
    setScore(0);
    setGameOver(false);
    setCharacters([]); // Rensa alla karaktärer
  }

  return { characters, score, gameOver, handleCharacterClick, resetGame };
}
