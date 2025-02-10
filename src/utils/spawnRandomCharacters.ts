import { GameState } from "./gameLogic";
import { positions } from "./positions";
import { CharacterType } from "../types/characterType";

const recentRemovals = new Set<string>();

export function spawnRandomCharacters(
  gameState: GameState,
  // maxCharacters: number,
  activeCharacters: CharacterType[],
  setActiveCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) {
  if (activeCharacters.length >= gameState.maxCharacters || gameState.isGameOver) return;

  // Skapa en lista över lediga platser
  const occupiedPositions = new Set(activeCharacters.map((char) => char.id));
  let availablePositions = positions.filter(
    (pos) => !occupiedPositions.has(pos.id) && !recentRemovals.has(pos.id) // Blockera nyligen borttagna
  );

  if (availablePositions.length === 0) {
    console.warn("Inga lediga positioner för att spawna karaktär!");
    return;
  }

  // Blanda positionerna för slumpmässighet
  availablePositions = shuffleArray(availablePositions);

  // maxCharacter är antalet som ska synas, det ställs i gameLogic
  const charactersToSpawn = Math.min(gameState.maxCharacters, availablePositions.length);

  availablePositions.slice(0, charactersToSpawn).forEach((pos, index) => {
    setTimeout(() => {
      // Spawnar karaktären med en viss fördröjning baserat på index
      const newCharacter: CharacterType = {
        id: pos.id,
        angle: pos.angle,
        clickedCharacter: false,
        animation: getAnimation(pos.id),
        animationDuration: gameState.animationDuration,
        type: Math.random() < gameState.goodCharacterProbability ? "good" : "evil",
      };

      console.log("Spawna karaktär:", newCharacter.id);
      setActiveCharacters((prev) => [...prev, newCharacter]);

      setTimeout(() => {
        setActiveCharacters((prev) => prev.filter((char) => char.id !== newCharacter.id));
        recentRemovals.add(newCharacter.id);

        setTimeout(() => {
          // console.log("Tillåter spawn igen:", newCharacter.id);
          recentRemovals.delete(newCharacter.id);
        }, gameState.animationDuration * 500);
      }, gameState.animationDuration * 1000);
    }, index * gameState.spawnInterval); // 🔥 Spawnar med små mellanrum baserat på index
  });
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
