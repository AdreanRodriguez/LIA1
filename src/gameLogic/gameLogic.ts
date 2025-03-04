export interface GameState {
  score: number;
  timeLeft: number;
  isPaused: boolean;
  isGameOver: boolean;
  spawnInterval: number;
  maxCharacters: number;
  animationDuration: number;
  goodCharacterProbability: number;
}

export const DEFAULT_GAME_STATE: GameState = {
  score: 0, // Startar på noll
  timeLeft: 15, // Startar med 15 sekunder
  isPaused: false, // Spelet är inte pausat
  maxCharacters: 3, // Max antal karaktärer som kan vara aktiva samtidigt
  isGameOver: false, // Det är inte Game Over
  spawnInterval: 900, // Sekund mellan varje spawn
  animationDuration: 2.5, // Antal sekunder per animation
  goodCharacterProbability: 0.2, // 20% sannolikhet för goda karaktärer
};

export function updateGameState(
  currentState: GameState,
  characterType: "good" | "evil"
): GameState {
  let {
    score,
    timeLeft,
    spawnInterval,
    maxCharacters,
    animationDuration,
    goodCharacterProbability,
  } = currentState;

  if (characterType === "evil") {
    timeLeft += 2; // +2 sekunder
    score += 10; // +10 poäng
  } else if (characterType === "good") {
    timeLeft -= 3; // -3 sekunder
  }

  // Se till att tiden aldrig blir negativ eller överstiga 60 sekunder
  timeLeft = Math.max(0, Math.min(timeLeft, 60));

  if (score < 100) {
    maxCharacters = 3; // Max antal karaktärer som kan vara aktiva samtidigt
    spawnInterval = 900; // Tid (i millisekunder) mellan varje ny spawn
    animationDuration = 2.5; // Hur länge en karaktärs animation varar (i sekunder)
    goodCharacterProbability = 0.2; // Sannolikhet (0-1) att en spawnad karaktär är "god" (ex. 0.2 = 20%)
  } else if (score < 200) {
    maxCharacters = 3;
    spawnInterval = 800;
    animationDuration = 2;
    goodCharacterProbability = 0.2;
  } else if (score < 300) {
    maxCharacters = 3;
    spawnInterval = 700;
    animationDuration = 1.8;
    goodCharacterProbability = 0.3;
  } else if (score < 400) {
    maxCharacters = 3;
    spawnInterval = 600;
    animationDuration = 1.4;
    goodCharacterProbability = 0.3;
  } else if (score < 500) {
    maxCharacters = 2;
    spawnInterval = 500;
    animationDuration = 1.2;
    goodCharacterProbability = 0.4;
  } else if (score < 600) {
    maxCharacters = 2;
    spawnInterval = 400;
    animationDuration = 1.2;
    goodCharacterProbability = 0.4;
  } else if (score < 700) {
    maxCharacters = 2;
    spawnInterval = 350;
    animationDuration = 1.2;
    goodCharacterProbability = 0.4;
  } else if (score < 800) {
    maxCharacters = 2;
    spawnInterval = 300;
    animationDuration = 1;
    goodCharacterProbability = 0.4;
  } else if (score < 900) {
    maxCharacters = 2;
    spawnInterval = 250;
    animationDuration = 1;
    goodCharacterProbability = 0.4;
  } else {
    maxCharacters = 2;
    spawnInterval = 200;
    animationDuration = 1;
    goodCharacterProbability = 0.4;
  }

  return {
    ...currentState,
    score,
    timeLeft,
    spawnInterval,
    maxCharacters,
    isGameOver: false,
    animationDuration,
    goodCharacterProbability,
  };
}
