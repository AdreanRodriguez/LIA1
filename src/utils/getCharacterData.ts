import GoodCharacter from "../../public/assets/goodCharacters/good.png";
import EvilCharacter from "../../public/assets/evilCharacters/evil.png";
import EvilCharacterUnderBus from "../../public/assets/evilCharacters/horizontalEvil.svg";

// Alla data för karaktärer
export const CharacterData = {
  "bus-left": {
    good: { characterImage: GoodCharacter, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilCharacter, size: { width: "100%", height: "100%" } },
  },
  "bus-right": {
    good: { characterImage: GoodCharacter, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilCharacter, size: { width: "100%", height: "100%" } },
  },
  "window-1": {
    good: { characterImage: GoodCharacter, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilCharacter, size: { width: "100%", height: "100%" } },
  },
  "window-2": {
    good: { characterImage: GoodCharacter, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilCharacter, size: { width: "100%", height: "100%" } },
  },
  "window-3": {
    good: { characterImage: GoodCharacter, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilCharacter, size: { width: "100%", height: "100%" } },
  },
  "window-4": {
    good: { characterImage: GoodCharacter, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilCharacter, size: { width: "100%", height: "100%" } },
  },
  "window-5": {
    good: { characterImage: GoodCharacter, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilCharacter, size: { width: "100%", height: "100%" } },
  },
  "bush-left": {
    good: { characterImage: GoodCharacter, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilCharacter, size: { width: "100%", height: "100%" } },
  },
  "bush-right": {
    good: { characterImage: GoodCharacter, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilCharacter, size: { width: "100%", height: "100%" } },
  },
  "under-bus": {
    good: { characterImage: GoodCharacter, size: { width: "0%", height: "0%" } },
    evil: { characterImage: EvilCharacterUnderBus, size: { width: "100%", height: "100%" } },
  },
};

// Funktion för att hämta data baserat på id och typ
export function getCharacterData(
  id: keyof typeof CharacterData,
  type: "good" | "evil"
): { characterImage: string; size: { width: string; height: string } } | null {
  const data = CharacterData[id];

  if (!data) {
    console.error(`Invalid id in getCharacterData: ${id}`);
    return null;
  }

  if (!data[type]) {
    console.error(`Invalid type in getCharacterData: ${type}`);
    return null;
  }

  // Filtrera bort den gode under bussen
  // Har ingen liggande bild på den gode
  if (id === "under-bus" && type === "good") {
    return null;
  }

  return data[type];
}
