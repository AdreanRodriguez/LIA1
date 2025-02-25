import { v4 as uuid } from "uuid";
import { GameState } from "./gameLogic";
import { positions } from "./positions";
import { CharacterType } from "../types/characterType";

export function spawnRandomCharacter(
  gameState: GameState,
  activeCharacters: CharacterType[]
): CharacterType | null {
  // Om spelet är över eller max antal karaktärer är nått, skapa ingen ny karaktär
  if (activeCharacters.length >= gameState.maxCharacters || gameState.isGameOver) return null;

  // Hämta en lista på positioner som redan är upptagna av andra karaktärer
  const occupiedPositions = new Set(activeCharacters.map((char) => char.positionId));

  // Filtrera ut positioner som inte är upptagna och kan användas
  let availablePositions = positions.filter((pos) => !occupiedPositions.has(pos.positionId));

  // Om inga positioner är tillgängliga, returnera null (ingen ny karaktär skapas)
  if (availablePositions.length === 0) return null;

  // Välj en slumpmässig ledig position från positions.ts
  const pos = shuffleArray(availablePositions)[0];

  // Skapa en ny karaktär
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

// Funktion för att slumpmässigt avgöra om karaktären är "god" eller "ond"
function getRandomCharacterType(probability: number): "good" | "evil" {
  return Math.random() < probability ? "good" : "evil";
}

// Fisher-Yates-algoritm för att slumpmässigt blanda en array
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
