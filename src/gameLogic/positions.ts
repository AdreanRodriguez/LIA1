import { PositionType } from "../types/characterType";

export const positions: PositionType[] = [
  // Fönsterpositioner (buss)
  { positionId: "window-1", angle: 0 },
  { positionId: "window-2", angle: 0 },
  { positionId: "window-3", angle: 0 },
  { positionId: "window-4", angle: 0 },
  { positionId: "window-5", angle: 0 },

  // Bussposition (vänster och höger sida)
  { positionId: "bus-left", angle: -60 },
  { positionId: "bus-right", angle: 45 },

  // Buskposition
  { positionId: "bush-left", angle: 0 },
  { positionId: "bush-right", angle: 0 },
  { positionId: "under-bus", angle: 0 },
];
