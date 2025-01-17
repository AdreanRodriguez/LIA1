export type CharacterId =
  | "window-1"
  | "window-2"
  | "window-3"
  | "window-4"
  | "window-5"
  | "window-6"
  | "window-7"
  | "bus-left"
  | "bus-right"
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
