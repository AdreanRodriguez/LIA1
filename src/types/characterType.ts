export type CharacterId =
  | "window-1"
  | "window-2"
  | "window-3"
  | "window-4"
  | "window-5"
  | "bus-left"
  | "bus-right"
  | "bush-left"
  | "bush-right"
  | "under-bus";

export interface PositionType {
  angle: number;
  id: CharacterId;
  // uuid: string;
}

export interface CharacterType extends PositionType {
  // score: number;
  // visible: boolean;
  uuid: string;
  animation: string;
  spawnTime: number;
  type: "good" | "evil";
  animationDuration: number;
  clickedCharacter?: boolean;
}
