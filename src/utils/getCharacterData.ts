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
  // "bus-left": {
  //   good: { characterImage: GoodBackLeft, size: { width: "10vh", height: "15vh" } },
  //   evil: { characterImage: EvilBackLeft, size: { width: "10vh", height: "15vh" } },
  // },
  // "bus-right": {
  //   good: { characterImage: GoodBackRight, size: { width: "10vw", height: "20vh" } },
  //   evil: { characterImage: EvilBackRight, size: { width: "10vw", height: "20vh" } },
  // },
  // "window-1": {
  //   good: { characterImage: GoodWindow1, size: { width: "10vh", height: "15vh" } },
  //   evil: { characterImage: EvilWindow1, size: { width: "10vh", height: "15vh" } },
  // },
  // "window-2": {
  //   good: { characterImage: GoodWindow2, size: { width: "10vh", height: "15vh" } },
  //   evil: { characterImage: EvilWindow2, size: { width: "10vh", height: "15vh" } },
  // },
  // "window-3": {
  //   good: { characterImage: GoodWindow2, size: { width: "10vh", height: "15vh" } },
  //   evil: { characterImage: EvilWindow2, size: { width: "10vh", height: "15vh" } },
  // },
  // "window-4": {
  //   good: { characterImage: GoodWindow2, size: { width: "10vh", height: "15vh" } },
  //   evil: { characterImage: EvilWindow2, size: { width: "10vh", height: "15vh" } },
  // },
  // "window-5": {
  //   good: { characterImage: GoodWindow2, size: { width: "10vh", height: "15vh" } },
  //   evil: { characterImage: EvilWindow2, size: { width: "10vh", height: "15vh" } },
  // },
  // "bush-left": {
  //   good: { characterImage: GoodBushLeft, size: { width: "20vh", height: "20vh" } },
  //   evil: { characterImage: EvilBushLeft, size: { width: "20vh", height: "20vh" } },
  // },
  // "bush-right": {
  //   good: { characterImage: GoodBushRight, size: { width: "20vh", height: "20vh" } },
  //   evil: { characterImage: EvilBushRight, size: { width: "20vh", height: "20vh" } },
  // },
  "bus-left": {
    good: { characterImage: GoodBackLeft, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilBackLeft, size: { width: "100%", height: "100%" } },
  },
  "bus-right": {
    good: { characterImage: GoodBackRight, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilBackRight, size: { width: "100%", height: "100%" } },
  },
  "window-1": {
    good: { characterImage: GoodWindow1, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilWindow1, size: { width: "100%", height: "100%" } },
  },
  "window-2": {
    good: { characterImage: GoodWindow2, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilWindow2, size: { width: "100%", height: "100%" } },
  },
  "window-3": {
    good: { characterImage: GoodWindow2, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilWindow2, size: { width: "100%", height: "100%" } },
  },
  "window-4": {
    good: { characterImage: GoodWindow2, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilWindow2, size: { width: "100%", height: "100%" } },
  },
  "window-5": {
    good: { characterImage: GoodWindow2, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilWindow2, size: { width: "100%", height: "100%" } },
  },
  "bush-left": {
    good: { characterImage: GoodBushLeft, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilBushLeft, size: { width: "100%", height: "100%" } },
  },
  "bush-right": {
    good: { characterImage: GoodBushRight, size: { width: "100%", height: "100%" } },
    evil: { characterImage: EvilBushRight, size: { width: "100%", height: "100%" } },
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

  return data[type];
}
