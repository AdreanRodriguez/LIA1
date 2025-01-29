// interface ClubHouseGameInterface {
//   gameDone: () => void;
//   getScore: () => number;
//   gameRunning: () => boolean;
//   setScore: (score: number) => void;
//   gameLoaded: (options: Options) => void;
//   registerRestart: (startFunction: () => void) => void;
// }

// interface Options {
//   // "hideInGame" kan man sätta till true om man vill sköta visningen av poäng själv
//   hideInGame: boolean;
// }

// declare global {
//   var ClubHouseGame: ClubHouseGameInterface;
// }

// export {};

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

// Definiera ClubHouseGame som en optional variabel på window
declare global {
  interface Window {
    ClubHouseGame?: ClubHouseGameInterface;
  }
}

export {};
