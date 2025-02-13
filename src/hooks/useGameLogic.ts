import { useCleanup } from "./useCleanup";
import { useState, useEffect } from "react";
import { gameOver } from "../utils/gameOver";
import { startGame } from "./../utils/startGame";
import { CharacterType } from "../types/characterType";
import { preloadAssets } from "../preload/preloadAssets";
import { spawnRandomCharacters } from "../utils/spawnRandomCharacters";
import { updateGameState, GameState, DEFAULT_GAME_STATE } from "../utils/gameLogic";

export function useGameLogic(
  isGameStarted: boolean,
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>
) {
  // Spelets tillstånd
  const [isGameReady, setIsGameReady] = useState<boolean>(false);
  const [activeCharacters, setActiveCharacters] = useState<CharacterType[]>([]);
  const [gameState, setGameState] = useState<GameState>({ ...DEFAULT_GAME_STATE });
  const [isPortrait, setIsPortrait] = useState<boolean>(
    window.matchMedia("(orientation: portrait)").matches
  );

  useCleanup(gameState);

  function startLoaderCheck() {
    let checkLoader = setInterval(() => {
      if (document.querySelector("#loader")) {
        // console.log("Hittade #loader.");
        window.ClubHouseGame?.gameLoaded({ hideInGame: true });
        clearInterval(checkLoader);
      }
    }, 100);

    return () => clearInterval(checkLoader);
  }

  useEffect(() => {
    const handleOrientationChange = (e: MediaQueryListEvent) => {
      const isPortraitMode = e.matches;
      setIsPortrait(isPortraitMode);

      // Stoppa tiden/pausa om man vrider telefonen i porträtt läge
      setGameState((prev) => ({ ...prev, isPaused: isPortraitMode }));
    };

    const mediaQuery = window.matchMedia("(orientation: portrait)");
    mediaQuery.addEventListener("change", handleOrientationChange);

    return () => mediaQuery.removeEventListener("change", handleOrientationChange);
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      await preloadAssets(); // Förladda bilder och fonter
      setIsGameReady(true);
      startLoaderCheck();
    };
    loadAssets();
  }, []);

  useEffect(() => {
    // Spelet är pausat
    if (gameState.isPaused) return;

    // Spelet är game over
    if (gameState.isGameOver) return gameOver(gameState.score);

    // Spelet har inte startat
    if (!isGameStarted) return startGame(setIsGameStarted, resetGameState);

    // Spawnar en karaktär varje spawnInterval
    const spawnInterval = setInterval(() => {
      setActiveCharacters((prevCharacters) => {
        if (prevCharacters.length >= gameState.maxCharacters) {
          // console.log(`Max antal karaktärer nått: ${gameState.maxCharacters}`);
          return prevCharacters;
        }
        spawnRandomCharacters(gameState, prevCharacters, setActiveCharacters);
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
    };
  }, [
    isGameStarted,
    gameState.isGameOver,
    gameState.spawnInterval,
    gameState.animationDuration,
    isPortrait,
  ]);

  function handleCharacterRemoval(uuid: string) {
    setActiveCharacters((prev) => prev.filter((char) => char.uuid !== uuid));
  }

  function handleCharacterClick(character: CharacterType) {
    if (character.clickedCharacter) return;

    setActiveCharacters((prev) =>
      prev.map((char) => (char.id === character.id ? { ...char, clickedCharacter: true } : char))
    );

    setGameState((prev) => updateGameState(prev, character.type));
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
    handleCharacterRemoval,
  };
}
