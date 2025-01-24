import { PositionType } from "../types/characterType";

export const positions: PositionType[] = [
  // Fönsterpositioner (buss)
  { id: "window-1", angle: 0 },
  { id: "window-2", angle: 0 },
  { id: "window-3", angle: 0 },
  { id: "window-4", angle: 0 },
  { id: "window-5", angle: 0 },

  // Bussposition (vänster och höger sida)
  { id: "bus-left", angle: -45 },
  { id: "bus-right", angle: 45 },

  // Buskposition
  { id: "bush-left", angle: 0 },
  { id: "bush-right", angle: 0 },
];

// Glöm inte att lägga till karaktär under bussen.
