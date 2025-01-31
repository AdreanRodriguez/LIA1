import { useState, useEffect, useRef } from "react";
import { positions } from "../utils/positions";
import { CharacterType } from "../types/characterType";
import { preloadImages } from "../utils/preloadImages";
import { updateGameState, GameState } from "../utils/gameLogic";

export function useGameLogic(maxCharacters: number, isGameStarted: boolean) {
  const activeTimeouts = useRef<number[]>([]);

  // Spelets tillstånd
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    timeLeft: 15, // Startar med 15 sekunder
    isGameOver: false,
    spawnInterval: 700,
    goodCharacterProbability: 0.2,
  });

  const [isGameReady, setIsGameReady] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImages();
        setIsGameReady(true);
      } catch (err) {
        console.error("Fel vid laddning av bilder:", err);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!isGameStarted || gameState.isGameOver) {
      setCharacters([]);
      return;
    }

    const spawnInterval = setInterval(spawnRandomCharacter, gameState.spawnInterval);
    const timerInterval = setInterval(() => {
      setGameState((prev) => {
        const newTime = prev.timeLeft - 1;
        if (newTime <= 0) return { ...prev, timeLeft: 0, isGameOver: true };
        return { ...prev, timeLeft: newTime };
      });
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
      activeTimeouts.current.forEach(clearTimeout);
      activeTimeouts.current = [];
    };
  }, [isGameStarted, gameState.isGameOver, gameState.spawnInterval]);

  function spawnRandomCharacter() {
    if (characters.length >= maxCharacters || gameState.isGameOver) return;

    const availablePositions = positions.filter(
      (pos) => !characters.some((char) => char.id && char.id === pos.id)
    );

    if (availablePositions.length === 0) return;

    const randomPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const randomType = Math.random() < gameState.goodCharacterProbability ? "good" : "evil";

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

    setCharacters((prev) => [...prev, newCharacter]);

    const timeoutId = setTimeout(() => {
      setCharacters((prev) => prev.filter((char) => char.id !== newCharacter.id));
    }, 1500);
    activeTimeouts.current.push(timeoutId);
  }

  function handleCharacterClick(character: CharacterType) {
    // För att ej kunna klicka flera gånger på samma karaktär.
    // if (character.clickedCharacter) return;

    setCharacters((prev) =>
      prev.map((char) => (char.id === character.id ? { ...char, clickedCharacter: true } : char))
    );

    const updatedState = updateGameState(gameState, character.type);
    setGameState(updatedState);
  }

  function restartGame() {
    setGameState({
      timeLeft: 15,
      score: 0,
      spawnInterval: 500,
      goodCharacterProbability: 0.3,
      isGameOver: false,
    });
    setCharacters([]);
  }

  return { characters, gameState, handleCharacterClick, restartGame, isGameReady };
}
