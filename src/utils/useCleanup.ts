import { useEffect } from "react";
import { GameState } from "./gameLogic";
// import { CharacterType } from "./../types/characterType";

let cleanupIntervalId: number | null = null;

export function useCleanup(
  gameState: GameState
  //   setActiveCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) {
  useEffect(() => {
    if (gameState.isGameOver) {
      console.log("Game over, stopping cleanup interval.");
      if (cleanupIntervalId) {
        clearInterval(cleanupIntervalId);
        cleanupIntervalId = null;
      }
      //   setActiveCharacters([]); // Rensa karaktärer om det behövs
    }

    return () => {
      if (cleanupIntervalId) {
        clearInterval(cleanupIntervalId);
        cleanupIntervalId = null;
      }
    };
  }, [
    gameState.isGameOver,
    // setActiveCharacters
  ]);
}
