import { GameState } from "./gameLogic";
import { CharacterType } from "../types/characterType";
import { spawnRandomCharacter } from "./spawnRandomCharacter";

export const spawnCharacter = (
  gameState: GameState,
  setActiveCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) => {
  let isActive = true;

  const spawn = () => {
    if (!isActive) return;

    setActiveCharacters((prevActiveCharacters) => {
      // Kollar om max antal karaktärer redan finns på spelplanen
      if (prevActiveCharacters.length >= gameState.maxCharacters) return prevActiveCharacters;

      // Skapar ny karaktär om det finns plats
      const newCharacter = spawnRandomCharacter(gameState, prevActiveCharacters);

      // Lägger till karaktären i activeCharacters
      return newCharacter ? [...prevActiveCharacters, newCharacter] : prevActiveCharacters;
    });

    if (isActive) {
      setTimeout(spawn, gameState.spawnInterval);
    }
  };

  spawn();

  return () => {
    isActive = false; // Stoppar loopen från att skapa fler karaktärer
  };
};
