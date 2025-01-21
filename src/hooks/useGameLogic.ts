import { useState, useEffect } from "react";
import { CharacterData } from "../utils/getCharacterData";
import { CharacterType } from "../types/characterType";
import { positions } from "../utils/positions";

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
    }, 2000);
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
