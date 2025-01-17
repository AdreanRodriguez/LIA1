export type CharacterId =
  | "back-left"
  | "back-right"
  | "window-1"
  | "window-2"
  | "bush-left"
  | "bush-right";

export interface PositionType {
  x: number;
  y: number;
  angle: number;
  id: CharacterId;
}

export interface CharacterType extends PositionType {
  score: number;
  animation: string;
  type: "good" | "evil";
  clickedCharacter?: boolean;
}
