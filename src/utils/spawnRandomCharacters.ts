import { v4 as uuid } from "uuid";
import { GameState } from "./gameLogic";
import { positions } from "./positions";
import { CharacterType } from "../types/characterType";

const recentRemovals = new Set<string>();
let cleanupFrameId: number | null = null;

export function spawnRandomCharacters(
  gameState: GameState,
  activeCharacters: CharacterType[],
  setActiveCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) {
  if (activeCharacters.length >= gameState.maxCharacters || gameState.isGameOver) return;

  const occupiedPositions = new Set(activeCharacters.map((char) => char.id));
  let availablePositions = positions.filter(
    (pos) => !occupiedPositions.has(pos.id) && !recentRemovals.has(pos.id)
  );

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
        type: Math.random() < gameState.goodCharacterProbability ? "good" : "evil",
        spawnTime: Date.now(), // Lägg till spawnTime
      };
    });

  setActiveCharacters((prev) => [...prev, ...newCharacters]);

  if (!cleanupFrameId) {
    cleanupFrameId = requestAnimationFrame(() => cleanupCharacters(gameState, setActiveCharacters));
  }
}

function cleanupCharacters(
  gameState: GameState,
  setActiveCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) {
  setActiveCharacters((prev) =>
    prev.filter((char) => Date.now() - char.spawnTime < gameState.animationDuration * 1000)
  );

  if (setActiveCharacters.length > 0) {
    cleanupFrameId = requestAnimationFrame(() => cleanupCharacters(gameState, setActiveCharacters));
  } else {
    cleanupFrameId = null; // Avsluta loop när det inte finns fler karaktärer
  }
}

// Fisher-Yates-algoritm för att blanda
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getAnimation(id: string): string {
  if (id.startsWith("window") || id === "bush-right" || id === "bush-left") return "slide-up";
  if (id === "under-bus") return "slide-under-bus";
  if (id === "bus-left") return "slide-right-to-left";
  if (id === "bus-right") return "slide-left-to-right";

  return "";
}
