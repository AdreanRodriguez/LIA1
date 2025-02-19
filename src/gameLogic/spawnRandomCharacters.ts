import { v4 as uuid } from "uuid";
import { GameState } from "./gameLogic";
import { positions } from "./positions";
import { CharacterType } from "../types/characterType";

export function spawnRandomCharacters(
  gameState: GameState,
  activeCharacters: CharacterType[]
): CharacterType[] {
  if (activeCharacters.length >= gameState.maxCharacters || gameState.isGameOver) return [];

  // Går igenom alla nuvarande aktiva karaktärer och skapar en array med endast deras positionId.
  // Om ett positionId råkar dyka upp flera gånger i listan, lagras den bara en gång i Set.
  const occupiedPositions = new Set(activeCharacters.map((char) => char.positionId));

  // Genom .filter() tar vi bara med de positioner som inte finns i occupiedPositions, alltså lediga positioner.
  let availablePositions = positions.filter((pos) => !occupiedPositions.has(pos.positionId));

  // Om alla positioner är upptagna
  if (availablePositions.length === 0) return [];

  availablePositions = shuffleArray(availablePositions);

  const charactersToSpawn = Math.min(
    gameState.maxCharacters - activeCharacters.length,
    availablePositions.length
  );

  // Hämta en lista med positioner där vi kan skapa karaktärer
  const possibleSpawnPositions = availablePositions.slice(0, charactersToSpawn);

  // Skapa en lista med karaktärer utifrån de lediga positionerna
  const newCharacter = possibleSpawnPositions.map((pos) => {
    // Korta ner uuid till 8 tecken
    const characterId = uuid().substring(0, 8);

    // Skapa en karaktär med alla dess egenskaper
    const character = {
      uuid: characterId,
      angle: pos.angle,
      clickedCharacter: false,
      positionId: pos.positionId,
      animation: getAnimation(pos.positionId),
      animationDuration: gameState.animationDuration,
      type: getRandomCharacterType(gameState.goodCharacterProbability),
    };

    return character;
  });

  // Returnera listan med nya karaktärer
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
