import { useState, useEffect } from "react";
import { gameOver } from "../gameLogic/gameOver";
import { startGame } from "../gameLogic/startGame";
import { CharacterType } from "../types/characterType";
import { preloadAssets } from "../preload/preloadAssets";
import { spawnCharacter } from "../gameLogic/spawnCharacter";
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
  }, [isPortrait]);

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
    if (gameState.isPaused) {
      setActiveCharacters([]); // Tömmer aktiva karaktärer för att de ska spawnas en och en
      return;
    }

    // Spelet är game over
    if (gameState.isGameOver) {
      gameOver(gameState.score);
      return;
    }

    // Spelet har inte startat
    if (!isGameStarted) {
      startGame(setIsGameStarted, resetGameState);
      return;
    }

    // Timer som räknar ner varje sekund
    const timerInterval = setInterval(() => {
      setGameState(updateTime);
    }, 1000);

    const cleanup = spawnCharacter(gameState, setActiveCharacters);

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

  function updateTime(currentState: GameState): GameState {
    if (currentState.isGameOver) return currentState;

    const newTime = currentState.timeLeft - 1;
    if (newTime <= 0) {
      return { ...currentState, timeLeft: 0, isGameOver: true };
    }
    return { ...currentState, timeLeft: newTime };
  }

  function handleCharacterRemoval(uuid: string) {
    setActiveCharacters((prevActiveCharacters) => {
      // Filtrera bort den karaktär som har samma uuid som den vi ska ta bort
      const updatedCharacters = prevActiveCharacters.filter((char) => char.uuid !== uuid);

      // Kontrollera om vi har plats för en ny karaktär
      if (updatedCharacters.length < gameState.maxCharacters) {
        // Skapa en ny karaktär om det finns plats
        const newCharacter = spawnRandomCharacter(gameState, updatedCharacters);

        // Om en ny karaktär skapas, lägg till den i listan och returnera
        return newCharacter ? [...updatedCharacters, newCharacter] : updatedCharacters;
      }
      // Om ingen ny karaktär skapas, returnera den uppdaterade listan
      return updatedCharacters;
    });
  }

  function handleCharacterClick(character: CharacterType) {
    if (character.clickedCharacter) return;

    setActiveCharacters((prevActiveCharacters) =>
      prevActiveCharacters.map((char) =>
        char.positionId === character.positionId ? { ...char, clickedCharacter: true } : char
      )
    );

    setGameState((prevGameState) => updateGameState(prevGameState, character.type));
  }

  // Funktion för att återställa spelet
  function resetGameState() {
    setActiveCharacters([]);
    setGameState({ ...DEFAULT_GAME_STATE });
  }

  return {
    gameState,
    isGameReady,
    isGameStarted,
    activeCharacters,
    handleCharacterClick,
    handleCharacterRemoval,
  };
}
