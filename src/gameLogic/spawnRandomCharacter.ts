import { v4 as uuid } from "uuid";
import { GameState } from "./gameLogic";
import { positions } from "./positions";
import { CharacterType } from "../types/characterType";

export function spawnRandomCharacter(
  gameState: GameState,
  activeCharacters: CharacterType[]
): CharacterType | null {
  if (activeCharacters.length >= gameState.maxCharacters || gameState.isGameOver) return null;

  const occupiedPositions = new Set(activeCharacters.map((char) => char.positionId));
  let availablePositions = positions.filter((pos) => !occupiedPositions.has(pos.positionId));

  if (availablePositions.length === 0) return null;

  const pos = shuffleArray(availablePositions)[0];

  const newCharacter = {
    uuid: uuid().substring(0, 8),
    angle: pos.angle,
    clickedCharacter: false,
    positionId: pos.positionId,
    animation: getAnimation(pos.positionId),
    animationDuration: gameState.animationDuration,
    type: getRandomCharacterType(gameState.goodCharacterProbability),
  };

  return newCharacter;
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
function getAnimation(positionId: string): string {
  if (positionId.startsWith("window") || positionId === "bush-right" || positionId === "bush-left")
    return "slide-up";
  if (positionId === "under-bus") return "slide-under-bus";
  if (positionId === "bus-left") return "slide-right-to-left";
  if (positionId === "bus-right") return "slide-left-to-right";

  return "";
}
