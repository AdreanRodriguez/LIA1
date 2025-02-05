import { GameState } from "./gameLogic";
import { positions } from "./positions";
import { CharacterType } from "../types/characterType";

export function spawnRandomCharacter(
  gameState: GameState,
  maxCharacters: number,
  activeCharacters: CharacterType[],
  setActiveCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) {
  if (activeCharacters.length >= maxCharacters || gameState.isGameOver) return;

  // Skapa en lista över lediga platser
  const occupiedPositions = new Set(activeCharacters.map((char) => char.id));
  const availablePositions = positions.filter((pos) => !occupiedPositions.has(pos.id));

  console.log(`Lediga positioner: ${availablePositions.length}`);
  if (!availablePositions.length) {
    console.warn("Inga lediga positioner för att spawna karaktär!");
    return;
  }

  // Välj en slumpmässig ledig position
  const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
  const randomType = Math.random() < gameState.goodCharacterProbability ? "good" : "evil";

  const newCharacter: CharacterType = {
    animation: getAnimation(randomPosition.id),
    type: randomType,
    id: randomPosition.id,
    clickedCharacter: false,
    angle: randomPosition.angle,
    animationDuration: gameState.animationDuration,
  };

  setActiveCharacters((prev) => [...prev, newCharacter]);

  // Ta bort karaktären efter animationens längd
  setTimeout(() => {
    setActiveCharacters((prev) => prev.filter((char) => char.id !== newCharacter.id));
  }, newCharacter.animationDuration * 1000);
}

function getAnimation(id: string): string {
  if (id.startsWith("window") || id === "bush-right" || id === "bush-left") return "slide-up";
  if (id === "under-bus") return "slide-under-bus";
  if (id === "bus-left") return "slide-right-to-left";
  if (id === "bus-right") return "slide-left-to-right";

  return "";
}
