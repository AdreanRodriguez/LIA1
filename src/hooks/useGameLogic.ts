import { useState, useEffect } from "react";
import { gameOver } from "../utils/gameOver";
import { startGame } from "../utils/startGame";
import { positions } from "../utils/positions";
import { CharacterType } from "../types/characterType";
import { preloadImages } from "../utils/preloadImages";

export function useGameLogic(
  maxCharacters: number,
  spawnInterval: number,
  isGameStarted: boolean,
  goodCharacterProbability: number
) {
  const timeoutIds = new Set<number>();
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameReady, setIsGameReady] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    preloadImages()
      .then(() => setIsGameReady(true))
      .catch((err) => console.error("Fel vid laddning av bilder:", err));

    return () => {
      timeoutIds.forEach(clearTimeout); // Rensa alla timers
    };
  }, []);

  useEffect(() => {
    if (!isGameStarted || isGameOver) {
      setCharacters([]); // Rensar karaktärer när spelet slutar
    }

    if (!isGameStarted) return;

    const interval = setInterval(spawnRandomCharacter, spawnInterval);

    return () => {
      clearInterval(interval);
      timeoutIds.forEach(clearTimeout);
    };
  }, [isGameStarted, isGameOver]);

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

    // Tilldela rätt animation baserat på position
    let animation = "";
    if (randomPosition.id.startsWith("window")) {
      animation = "slide-up";
    } else if (randomPosition.id === "under-bus") {
      animation = "slide-under-bus";
    } else if (randomPosition.id === "bus-left") {
      animation = "slide-right-to-left";
    } else if (randomPosition.id === "bus-right") {
      animation = "slide-left-to-right";
    }

    const newCharacter: CharacterType = {
      animation,
      visible: true,
      type: randomType,
      id: randomPosition.id,
      clickedCharacter: false,
      angle: randomPosition.angle,
      score: randomType === "evil" ? 10 : 0,
    };

    updateCharacters((prev) => [...prev, newCharacter]);

    // Ta bort karaktären efter 2 sekunder
    setTimeout(() => {
      updateCharacters((prev) => prev.filter((char) => char.id !== newCharacter.id));
    }, 1500);
  }

  // Kanske göra så att den gode stannar lite längre ?

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
    setCharacters([]); // Rensar karaktärer när spelet slutar
  }

  return { characters, score, isGameOver, handleCharacterClick, restartGame, isGameReady };
}
