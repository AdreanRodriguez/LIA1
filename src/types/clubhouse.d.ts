interface ClubHouseGameInterface {
  gameDone: () => void;
  getScore: () => number;
  gameRunning: () => boolean;
  setScore: (score: number) => void;
  gameLoaded: (options: Options) => void;
  registerRestart: (startFunction: () => void) => void;
}

interface Options {
  hideInGame: boolean;
}

declare global {
  var ClubHouseGame: ClubHouseGameInterface;
}

export {};
