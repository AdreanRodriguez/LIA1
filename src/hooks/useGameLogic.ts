import { useState, useEffect } from "react";
import { gameOver } from "../utils/gameOver";
import { positions } from "../utils/positions";
import { CharacterType } from "../types/characterType";

export function useGameLogic(
  maxCharacters: number,
  spawnInterval: number,
  startGame: boolean,
  goodCharacterProbability: number
) {
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    if (startGame || isGameOver) return;

    const interval = setInterval(() => {
      spawnRandomCharacter();
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [characters, isGameOver, startGame]);

  function spawnRandomCharacter() {
    if (characters.length >= maxCharacters || isGameOver) return;

    // Filtrera positioner där karaktärer redan finns
    const availablePositions = positions.filter(
      (pos) => !characters.some((char) => char.id === pos.id)
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
    // Hindra dubbelklick på karaktärerna.
    if (character.clickedCharacter) {
      return;
    }

    setCharacters((prev) =>
      prev.map((char) => (char.id === character.id ? { ...char, clickedCharacter: true } : char))
    );

    if (character.type === "good") {
      gameOver(score);
      setIsGameOver(true);
    } else if (character.type === "evil") {
      setScore((prev) => prev + character.score);
    }
  }

  // Återställer spelplanen
  function restartGame() {
    setScore(0);
    setIsGameOver(false);
    setCharacters([]); // Rensa alla karaktärer
  }

  return { characters, score, isGameOver, handleCharacterClick, restartGame };
}
