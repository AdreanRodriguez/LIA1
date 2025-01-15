export interface PositionType {
  id: "back-left" | "back-right" | "window-1" | "window-2" | "bush-left" | "bush-right";
  x: number;
  y: number;
  angle: number;
}

export interface CharacterType extends PositionType {
  type: "good" | "evil";
  points: number;
  animation: string;
}
