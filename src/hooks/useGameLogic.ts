import { useState, useEffect } from "react";
import { gameOver } from "../gameLogic/gameOver";
import { startGame } from "../gameLogic/startGame";
import { CharacterType } from "../types/characterType";
import { preloadAssets } from "../preload/preloadAssets";
import { spawnRandomCharacter } from "../gameLogic/spawnRandomCharacter";
import { updateGameState, GameState, DEFAULT_GAME_STATE } from "../gameLogic/gameLogic";

export function useGameLogic() {
  const [isGameReady, setIsGameReady] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [activeCharacters, setActiveCharacters] = useState<CharacterType[]>([]);
  const [gameState, setGameState] = useState<GameState>({ ...DEFAULT_GAME_STATE });

  const [isPortrait, setIsPortrait] = useState<boolean>(
    window.matchMedia("(orientation: portrait)").matches
  );

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

    const cleanup = spawnCharacter();

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
      cleanup();
      clearInterval(timerInterval);
    };
  }, [
    isPortrait,
    isGameStarted,
    gameState.isGameOver,
    gameState.spawnInterval,
    gameState.animationDuration,
  ]);

  let spawnRunning = false; // Kontrollvariabel

  function spawnCharacter() {
    if (spawnRunning) return () => {}; // Stoppa om en loop redan körs
    spawnRunning = true; // Sätt att en loop är igång

    let isActive = true;

    const spawn = () => {
      if (!isActive) return;

      setActiveCharacters((prevCharacters) => {
        if (prevCharacters.length >= gameState.maxCharacters) return prevCharacters;

        const newCharacter = spawnRandomCharacter(gameState, prevCharacters);
        return newCharacter ? [...prevCharacters, newCharacter] : prevCharacters;
      });

      setGameState((prevGameState) => ({ ...prevGameState }));

      if (isActive) {
        setTimeout(spawn, gameState.spawnInterval);
      }
    };

    spawn();

    return () => {
      isActive = false;
      spawnRunning = false; // Markera att loopen är stoppad
    };
  }

  function handleCharacterRemoval(uuid: string) {
    setActiveCharacters((prev) => {
      const updatedCharacters = prev.filter((char) => char.uuid !== uuid);
      if (updatedCharacters.length < gameState.maxCharacters) {
        const newCharacter = spawnRandomCharacter(gameState, updatedCharacters);
        return newCharacter ? [...updatedCharacters, newCharacter] : updatedCharacters;
      }
      return updatedCharacters;
    });
  }

  function handleCharacterClick(character: CharacterType) {
    if (character.clickedCharacter) return;

    setActiveCharacters((prev) =>
      prev.map((char) =>
        char.positionId === character.positionId ? { ...char, clickedCharacter: true } : char
      )
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
    isGameStarted,
    resetGameState,
    activeCharacters,
    handleCharacterClick,
    handleCharacterRemoval,
  };
}
