import { useState, useEffect } from "react";
import { CharacterType, PositionType } from "../types/characterType";

const positions: PositionType[] = [
  { id: "back-left", x: 10, y: 40, angle: 45 },
  { id: "back-right", x: 80, y: 40, angle: -45 },
  { id: "window-1", x: 30, y: 20, angle: 0 },
  { id: "window-2", x: 50, y: 20, angle: 0 },
  { id: "bush-left", x: 15, y: 70, angle: 0 },
  { id: "bush-right", x: 75, y: 70, angle: 0 },
];

export function useGameLogic(maxCharacters: number, spawnInterval: number) {
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      spawnRandomCharacter();
    }, spawnInterval);

    return () => clearInterval(interval); // Rensa intervallet vid avmontering
  }, [characters, gameOver]);

  function spawnRandomCharacter() {
    if (characters.length >= maxCharacters || gameOver) return;

    const availablePositions = positions.filter(
      (pos) => !characters.some((char) => char.id === pos.id)
    );

    if (availablePositions.length === 0) return;

    const randomPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const randomType = Math.random() > 0.5 ? "good" : "evil";

    const newCharacter: CharacterType = {
      id: randomPosition.id,
      x: randomPosition.x,
      y: randomPosition.y,
      angle: randomPosition.angle,
      type: randomType,
      points: randomType === "evil" ? 10 : 0,
      animation: randomPosition.id.includes("window") ? "slide-in" : "fade-in",
    };

    setCharacters((prev) => [...prev, newCharacter]);

    // Ta bort karaktären efter 2 sekunder
    setTimeout(() => {
      setCharacters((prev) => prev.filter((char) => char.id !== newCharacter.id));
    }, 2000);
  }

  function handleCharacterClick(type: "good" | "evil") {
    if (type === "good") {
      setGameOver(true);
    } else if (type === "evil") {
      setScore((prev) => prev + 10);
    }
  }

  return { characters, score, gameOver, handleCharacterClick };
}
