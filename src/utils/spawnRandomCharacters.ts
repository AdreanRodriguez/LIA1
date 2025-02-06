import { GameState } from "./gameLogic";
import { positions } from "./positions";
import { CharacterType } from "../types/characterType";

export function spawnRandomCharacters(
  gameState: GameState,
  maxCharacters: number,
  activeCharacters: CharacterType[],
  setActiveCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) {
  if (activeCharacters.length >= maxCharacters || gameState.isGameOver) return;

  // Skapa en lista över lediga platser
  const occupiedPositions = new Set(activeCharacters.map((char) => char.id));
  let availablePositions = positions.filter((pos) => !occupiedPositions.has(pos.id));

  if (availablePositions.length === 0) {
    console.warn("Inga lediga positioner för att spawna karaktär!");
    return;
  }

  // Shuffle för att få mer slumpmässighet
  availablePositions = availablePositions.sort(() => Math.random() - 0.5);

  // Antal vi försöker skapa, hur många som ska synas
  const charactersToSpawn = Math.min(5, availablePositions.length);

  // Skapa nya karaktärer på unika positioner
  const newCharacters: CharacterType[] = availablePositions
    .slice(0, charactersToSpawn)
    .map((pos) => ({
      animation: getAnimation(pos.id),
      type: Math.random() < gameState.goodCharacterProbability ? "good" : "evil",
      id: pos.id,
      clickedCharacter: false,
      angle: pos.angle,
      animationDuration: gameState.animationDuration,
    }));

  setActiveCharacters((prev) => [...prev, ...newCharacters]);

  // Rensa karaktärerna efter animationens längd
  newCharacters.forEach((character) => {
    setTimeout(() => {
      setActiveCharacters((prev) => prev.filter((char) => char.id !== character.id));
    }, character.animationDuration * 1000);
  });
}

function getAnimation(id: string): string {
  if (id.startsWith("window") || id === "bush-right" || id === "bush-left") return "slide-up";
  if (id === "under-bus") return "slide-under-bus";
  if (id === "bus-left") return "slide-right-to-left";
  if (id === "bus-right") return "slide-left-to-right";

  return "";
}
