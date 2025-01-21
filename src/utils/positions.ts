import { PositionType } from "../types/characterType";

export const positions: PositionType[] = [
  { id: "window-1", x: 12, y: 49, angle: 0 },
  { id: "window-2", x: 32, y: 49, angle: 0 },
  { id: "window-3", x: 44, y: 49, angle: 0 },
  { id: "window-4", x: 55, y: 49, angle: 0 },
  { id: "window-5", x: 65, y: 49, angle: 0 },
  { id: "window-6", x: 75, y: 49, angle: 0 },
  { id: "bus-left", x: -2, y: 55, angle: -45 },
  { id: "bus-right", x: 98, y: 58, angle: 45 },
  { id: "bush-left", x: 10, y: 70, angle: 0 },
  { id: "bush-right", x: 76, y: 70, angle: 0 },
];

// id: Unikt ID som matchar CharacterData
// x: Horisontell position i procent av containern
// y: Vertikal position i procent av containern
// angle: Rotation i grader
