import { gameOver } from "../utils/gameOver";
import { positions } from "../utils/positions";
import { startGame } from "./../utils/startGame";
import { useState, useEffect, useRef } from "react";
import { CharacterType } from "../types/characterType";
import { preloadImages } from "../utils/preloadImages";
import { spawnRandomCharacters } from "../utils/spawnRandomCharacters";
import { updateGameState, GameState, DEFAULT_GAME_STATE } from "../utils/gameLogic";

export function useGameLogic(
  maxCharacters: number,
  isGameStarted: boolean,
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>
) {
  const activeTimeouts = useRef<number[]>([]);

  // Spelets tillstånd
  const [isGameReady, setIsGameReady] = useState<boolean>(false);
  const [activeCharacters, setActiveCharacters] = useState<CharacterType[]>([]);
  const [gameState, setGameState] = useState<GameState>({ ...DEFAULT_GAME_STATE });

  function startLoaderCheck() {
    let checkLoader = setInterval(() => {
      if (document.getElementById("loader")) {
        console.log("Hittade #loader.");
        window.ClubHouseGame?.gameLoaded({ hideInGame: true });
        clearInterval(checkLoader);
      }
    }, 1000);

    return () => clearInterval(checkLoader); // Cleanup
  }

  useEffect(() => {
    preloadImages().then(() => setIsGameReady(true));

    return startLoaderCheck();
  }, []);

  useEffect(() => {
    if (!isGameStarted) {
      startGame(setIsGameStarted, resetGameState);
      return;
    }

    if (gameState.isGameOver) {
      gameOver(gameState.score);
      setActiveCharacters([]);
      return;
    }

    // Spawnar en karaktär varje spawnInterval
    // const spawnInterval = setInterval(() => {
    //   setActiveCharacters((prevCharacters) => {
    //     if (prevCharacters.length >= maxCharacters) return prevCharacters; // 👈 Kolla maxCharacters här!

    //     spawnRandomCharacters(gameState, maxCharacters, prevCharacters, setActiveCharacters);
    //     return prevCharacters;
    //   });
    // }, gameState.spawnInterval);

    const spawnInterval = setInterval(() => {
      setActiveCharacters((prevCharacters) => {
        const availableSlots = positions.filter(
          (pos) => !prevCharacters.some((char) => char.id === pos.id)
        );

        if (availableSlots.length === 0) return prevCharacters;

        spawnRandomCharacters(
          gameState,
          availableSlots.length,
          prevCharacters,
          setActiveCharacters
        );
        return prevCharacters;
      });
    }, gameState.spawnInterval);

    // Timer som räknar ner varje sekund
    const timerInterval = setInterval(() => {
      setGameState((prev) => {
        if (prev.isGameOver) {
          clearInterval(timerInterval);
          return prev;
        }

        const newTime = prev.timeLeft - 1;
        if (newTime <= 0) {
          return { ...prev, timeLeft: 0, isGameOver: true };
        }
        return { ...prev, timeLeft: newTime };
      });
    }, 1000);

    // Rensa timers när spelet avslutas eller startas om
    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);

      // Rensa alla sparade timeouts för att undvika buggar
      activeTimeouts.current.forEach(clearTimeout);
      activeTimeouts.current = [];
    };
  }, [isGameStarted, gameState.isGameOver, gameState.spawnInterval, gameState.animationDuration]);

  function handleCharacterClick(character: CharacterType) {
    // förhindra dubbelklick
    if (character.clickedCharacter) return;

    setTimeout(() => {
      setActiveCharacters((prev) =>
        prev.map((char) => (char.id === character.id ? { ...char, clickedCharacter: true } : char))
      );
    });

    setGameState((prev) => {
      const newState = updateGameState(prev, character.type);
      // console.log("Nytt gameState:", newState);
      return newState;
    });

    // Ta bort karaktären efter en kort tid så att "poff" syns
    setTimeout(() => {
      setActiveCharacters((prev) => prev.filter((char) => char.id !== character.id));
    }, character.animationDuration * 1000);
  }

  // Funktion för att återställa spelet
  function resetGameState() {
    setActiveCharacters([]);
    setGameState({ ...DEFAULT_GAME_STATE });
  }

  return {
    gameState,
    isGameReady,
    setGameState,
    resetGameState,
    activeCharacters,
    handleCharacterClick,
  };
}
