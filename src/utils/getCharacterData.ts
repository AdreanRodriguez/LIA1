// Alla data för karaktärer
export const CharacterData = {
  "bus-left": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "100%", height: "100%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/evil.png",
      size: { width: "100%", height: "100%" },
    },
  },
  "bus-right": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "100%", height: "100%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/evil.png",
      size: { width: "100%", height: "100%" },
    },
  },
  "window-1": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "100%", height: "100%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/evil.png",
      size: { width: "100%", height: "100%" },
    },
  },
  "window-2": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "100%", height: "100%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/evil.png",
      size: { width: "100%", height: "100%" },
    },
  },
  "window-3": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "100%", height: "100%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/evil.png",
      size: { width: "100%", height: "100%" },
    },
  },
  "window-4": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "100%", height: "100%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/evil.png",
      size: { width: "100%", height: "100%" },
    },
  },
  "window-5": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "100%", height: "100%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/evil.png",
      size: { width: "100%", height: "100%" },
    },
  },
  "bush-left": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "100%", height: "100%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/evil.png",
      size: { width: "100%", height: "100%" },
    },
  },
  "bush-right": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "100%", height: "100%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/evil.png",
      size: { width: "100%", height: "100%" },
    },
  },
  "under-bus": {
    good: {
      characterImage: "/assets/goodCharacters/good.png",
      size: { width: "0%", height: "0%" },
    },
    evil: {
      characterImage: "/assets/evilCharacters/horizontalEvil.svg",
      size: { width: "100%", height: "100%" },
    },
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
