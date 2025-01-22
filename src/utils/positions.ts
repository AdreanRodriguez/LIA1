import { PositionType } from "../types/characterType";

export const positions: PositionType[] = [
  // Fönsterpositioner (buss)
  { id: "window-1", x: 76, y: 84, angle: 0 },
  { id: "window-2", x: 99, y: 66, angle: 0 },
  { id: "window-3", x: 265, y: 86, angle: 0 },
  { id: "window-4", x: 370, y: 86, angle: 0 },
  { id: "window-5", x: 450, y: 86, angle: 0 },

  // Bussposition (vänster och höger sida)
  { id: "bus-left", x: 76, y: 42, angle: -45 },
  { id: "bus-right", x: 635, y: 130, angle: 45 },

  // Buskposition
  { id: "bush-left", x: 22, y: 22, angle: 0 },
  { id: "bush-right", x: 22, y: 22, angle: 0 },
];

// id: Unikt ID som matchar CharacterData
// x: Horisontell position i procent av containern
// y: Vertikal position i procent av containern
// angle: Rotation i grader

// Kan göra att flera karaktärer dyker upp i samma fönster
// { id: "window-2a", x: 32, y: 32, angle: 0 },
// { id: "window-2b", x: 38, y: 32, angle: 0 },

// Glöm inte att lägga till karaktär under bussen.
