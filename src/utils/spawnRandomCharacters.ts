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
  const availablePositions = positions.filter((pos) => !occupiedPositions.has(pos.id));

  console.log(`Lediga positioner: ${availablePositions.length}`);

  if (!availablePositions.length) {
    console.error("Inga lediga positioner för att spawna karaktärer!");
    return;
  }

  // Bestäm hur många karaktärer vi vill spawna (t.ex. 2–4)
  const numberOfCharacters = Math.min(2 + Math.floor(Math.random() * 3), availablePositions.length);

  const newCharacters: CharacterType[] = [];

  for (let i = 0; i < numberOfCharacters; i++) {
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const randomPosition = availablePositions.splice(randomIndex, 1)[0]; // Ta bort positionen från arrayen

    const randomType = Math.random() < gameState.goodCharacterProbability ? "good" : "evil";

    const newCharacter: CharacterType = {
      animation: getAnimation(randomPosition.id),
      type: randomType,
      id: randomPosition.id,
      clickedCharacter: false,
      angle: randomPosition.angle,
      animationDuration: gameState.animationDuration,
    };

    newCharacters.push(newCharacter);
  }

  // Lägg till de nya karaktärerna i spelet
  setActiveCharacters((prev) => [...prev, ...newCharacters]);

  // Ta bort karaktärerna efter deras animationstid
  newCharacters.forEach((char) => {
    setTimeout(() => {
      setActiveCharacters((prev) => prev.filter((c) => c.id !== char.id));
    }, char.animationDuration * 1000);
  });
}

function getAnimation(id: string): string {
  if (id.startsWith("window") || id === "bush-right" || id === "bush-left") return "slide-up";
  if (id === "under-bus") return "slide-under-bus";
  if (id === "bus-left") return "slide-right-to-left";
  if (id === "bus-right") return "slide-left-to-right";

  return "";
}
