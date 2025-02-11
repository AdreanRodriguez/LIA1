import { v4 as uuid } from "uuid";
import { GameState } from "./gameLogic";
import { positions } from "./positions";
import { CharacterType } from "../types/characterType";

export function spawnRandomCharacters(
  gameState: GameState,
  activeCharacters: CharacterType[],
  setActiveCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) {
  if (activeCharacters.length >= gameState.maxCharacters || gameState.isGameOver) return;

  const occupiedPositions = new Set(activeCharacters.map((char) => char.id));
  let availablePositions = positions.filter((pos) => !occupiedPositions.has(pos.id));

  if (availablePositions.length === 0) return;

  availablePositions = shuffleArray(availablePositions);

  const charactersToSpawn = Math.min(
    gameState.maxCharacters - activeCharacters.length,
    availablePositions.length
  );

  const newCharacters: CharacterType[] = availablePositions
    .slice(0, charactersToSpawn)
    .map((pos) => {
      const shortUuid = uuid().substring(0, 8);

      return {
        id: pos.id,
        uuid: shortUuid,
        angle: pos.angle,
        clickedCharacter: false,
        animation: getAnimation(pos.id),
        animationDuration: gameState.animationDuration,
        type: getRandomCharacterType(gameState.goodCharacterProbability),
        spawnTime: Date.now(), // Lägg till spawnTime
      };
    });

  setActiveCharacters((prev) => [...prev, ...newCharacters]);
}

function getRandomCharacterType(probability: number): "good" | "evil" {
  return Math.random() < probability ? "good" : "evil";
}

// Fisher-Yates-algoritm för att blanda karaktärerna
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Funktion för att sätta de olika animations id:n som finns i character.css
function getAnimation(id: string): string {
  if (id.startsWith("window") || id === "bush-right" || id === "bush-left") return "slide-up";
  if (id === "under-bus") return "slide-under-bus";
  if (id === "bus-left") return "slide-right-to-left";
  if (id === "bus-right") return "slide-left-to-right";

  return "";
}
