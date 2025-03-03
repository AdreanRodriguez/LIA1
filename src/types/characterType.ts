// Uniontype, variabel av typen CharacterId kan bara innehålla dessa specifika strängvärden.
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
  positionId: CharacterId;
}

export interface CharacterType extends PositionType {
  uuid: string;
  animation: string;
  type: "good" | "evil";
  animationDuration: number;
  clickedCharacter?: boolean;
}
