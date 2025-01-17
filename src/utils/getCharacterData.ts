import EvilBackLeft from "../assets/evilCharacters/EvilBackLeft.svg";
import EvilBackRight from "../assets/evilCharacters/EvilBackRight.svg";
import EvilWindow1 from "../assets/evilCharacters/EvilWindow1.svg";
import EvilWindow2 from "../assets/evilCharacters/EvilWindow2.svg";
import EvilBushLeft from "../assets/evilCharacters/EvilBushLeft.svg";
import EvilBushRight from "../assets/evilCharacters/EvilBushRight.svg";

import GoodBackLeft from "../assets/goodCharacters/GoodBackLeft.svg";
import GoodBackRight from "../assets/goodCharacters/GoodBackRight.svg";
import GoodWindow1 from "../assets/goodCharacters/GoodWindow1.svg";
import GoodWindow2 from "../assets/goodCharacters/GoodWindow2.svg";
import GoodBushLeft from "../assets/goodCharacters/GoodBushLeft.svg";
import GoodBushRight from "../assets/goodCharacters/GoodBushRight.svg";

// Alla data för karaktärer
export const CharacterData = {
  "bus-left": {
    good: { characterImage: GoodBackLeft, size: { width: "50px", height: "50px" } },
    evil: { characterImage: EvilBackLeft, size: { width: "70px", height: "60px" } },
  },
  "bus-right": {
    good: { characterImage: GoodBackRight, size: { width: "50px", height: "50px" } },
    evil: { characterImage: EvilBackRight, size: { width: "60px", height: "60px" } },
  },
  "window-1": {
    good: { characterImage: GoodWindow1, size: { width: "40px", height: "40px" } },
    evil: { characterImage: EvilWindow1, size: { width: "50px", height: "50px" } },
  },
  "window-2": {
    good: { characterImage: GoodWindow2, size: { width: "40px", height: "40px" } },
    evil: { characterImage: EvilWindow2, size: { width: "50px", height: "50px" } },
  },
  "window-3": {
    good: { characterImage: GoodWindow2, size: { width: "40px", height: "40px" } },
    evil: { characterImage: EvilWindow2, size: { width: "50px", height: "50px" } },
  },
  "window-4": {
    good: { characterImage: GoodWindow2, size: { width: "40px", height: "40px" } },
    evil: { characterImage: EvilWindow2, size: { width: "50px", height: "50px" } },
  },
  "window-5": {
    good: { characterImage: GoodWindow2, size: { width: "40px", height: "40px" } },
    evil: { characterImage: EvilWindow2, size: { width: "50px", height: "50px" } },
  },
  "window-6": {
    good: { characterImage: GoodWindow2, size: { width: "40px", height: "40px" } },
    evil: { characterImage: EvilWindow2, size: { width: "50px", height: "50px" } },
  },
  "window-7": {
    good: { characterImage: GoodWindow2, size: { width: "40px", height: "40px" } },
    evil: { characterImage: EvilWindow2, size: { width: "50px", height: "50px" } },
  },
  "bush-left": {
    good: { characterImage: GoodBushLeft, size: { width: "30px", height: "30px" } },
    evil: { characterImage: EvilBushLeft, size: { width: "40px", height: "40px" } },
  },
  "bush-right": {
    good: { characterImage: GoodBushRight, size: { width: "30px", height: "30px" } },
    evil: { characterImage: EvilBushRight, size: { width: "40px", height: "40px" } },
  },
};

// Funktion för att hämta data baserat på id och typ
export function getCharacterData(
  id: keyof typeof CharacterData,
  type: "good" | "evil"
): { characterImage: string; size: { width: string; height: string } } {
  const data = CharacterData[id];

  if (!data) {
    console.error(`Invalid id in getCharacterData: ${id}`);
    return {
      characterImage: "../assets/poff.svg", // En placeholder-bild
      size: { width: "50px", height: "50px" },
    };
  }

  if (!data[type]) {
    console.error(`Invalid type in getCharacterData: ${type}`);
    return {
      characterImage: "../assets/poff.svg",
      size: { width: "50px", height: "50px" },
    };
  }

  return data[type];
}
