// import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import { gameOver } from "../utils/gameOver";
import { startGame } from "../utils/startGame";
import { positions } from "../utils/positions";
import { CharacterType } from "../types/characterType";

export function useGameLogic(
  maxCharacters: number,
  spawnInterval: number,
  isGameStarted: boolean,
  goodCharacterProbability: number
) {
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

    const interval = setInterval(() => {
      spawnRandomCharacter();
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [isGameOver, isGameStarted]);

  function spawnRandomCharacter() {
    if (characters.length >= maxCharacters || isGameOver) return;

    const availablePositions = positions.filter(
      (pos) => !characters.some((char) => char.id && char.id === pos.id)
    );

    if (availablePositions.length === 0) {
      console.warn("No available positions to spawn a character.");
      return;
    }

    const randomPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const randomType = Math.random() < goodCharacterProbability ? "good" : "evil";

    const newCharacter: CharacterType = {
      type: randomType,
      // x: randomPosition.x,
      // y: randomPosition.y,
      id: randomPosition.id,
      clickedCharacter: false,
      angle: randomPosition.angle,
      // uuid: uuid().substring(0, 4),
      score: randomType === "evil" ? 10 : 0,
      animation: randomPosition.id.includes("window") ? "slide-in" : "fade-in",
    };

    // setCharacters((prev) => [...prev, newCharacter]);
    updateCharacters((prev) => {
      const updatedCharacters = [...prev, newCharacter];
      return updatedCharacters;
    });

    // Ta bort karaktären efter 2 sekunder
    setTimeout(() => {
      updateCharacters((prev) => prev.filter((char) => char.id !== newCharacter.id));
    }, 22000);
  }

  function handleCharacterClick(character: CharacterType) {
    // Så att man inte ska kunna klicka flera gånger på samma karaktär.
    // Hindra dubbelklick på karaktärerna.
    if (character.clickedCharacter) {
      return;
    }

    updateCharacters((prev) =>
      prev.map((char) => (char.id === character.id ? { ...char, clickedCharacter: true } : char))
    );

    if (character.type === "good") {
      gameOver(score);
      setIsGameOver(true);
    } else if (character.type === "evil") {
      setScore((prev) => prev + character.score);
    }
  }

  function updateCharacters(characterUpdater: (prev: CharacterType[]) => CharacterType[]) {
    setCharacters((prev) => {
      const updated = characterUpdater(prev);
      // Säkerställ att alla karaktärer har unika ID:n
      const uniqueCharacters = updated.filter(
        (character, index, self) => index === self.findIndex((char) => char.id === character.id)
      );
      return uniqueCharacters;
    });
  }

  // Återställer spelplanen
  function restartGame() {
    startGame();
    setScore(0);
    setIsGameOver(false);
    setCharacters([]); // Rensa alla karaktärer
  }

  return { characters, score, isGameOver, handleCharacterClick, restartGame };
}
