import { useEffect } from "react";
import { GameState } from "../utils/gameLogic";
import { useGameLogic } from "./useGameLogic";

let cleanupIntervalId: number | null = null;

export function useCleanup(gameState: GameState) {
  useEffect(() => {
    if (gameState.isGameOver) {
      useGameLogic;
      console.log("Game over, stopping cleanup interval.");
      if (cleanupIntervalId) {
        clearInterval(cleanupIntervalId);
        cleanupIntervalId = null;
      }
    }

    return () => {
      if (cleanupIntervalId) {
        clearInterval(cleanupIntervalId);
        cleanupIntervalId = null;
      }
    };
  }, [gameState.isGameOver]);
}
