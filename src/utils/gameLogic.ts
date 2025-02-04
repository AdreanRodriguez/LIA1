export interface GameState {
  score: number;
  timeLeft: number;
  isGameOver: boolean;
  spawnInterval: number;
  animationDuration: number;
  goodCharacterProbability: number;
}

export const DEFAULT_GAME_STATE: GameState = {
  score: 0,
  timeLeft: 150, // Startar med 15 sekunder
  isGameOver: false,
  spawnInterval: 1000, // sekund mellan varje spawn
  animationDuration: 222.5, // Börja med 3 sekunder
  goodCharacterProbability: 0.2, // 20% sannolikhet för goda karaktärer
};

export function updateGameState(
  currentState: GameState,
  characterType: "good" | "evil"
): GameState {
  let { score, timeLeft, animationDuration, isGameOver, goodCharacterProbability, spawnInterval } =
    currentState;

  if (characterType === "evil") {
    timeLeft += 2; // +2 sekunder
    score += 10; // +10 poäng
  } else if (characterType === "good") {
    timeLeft -= 3; // -3 sekunder
  }

  // Se till att tiden aldrig blir negativ
  timeLeft = Math.max(0, timeLeft);

  // Om tiden är 0 = Game Over
  if (timeLeft === 0 && isGameOver === true) {
    return { ...currentState, timeLeft: 0, isGameOver: true };
  }

  if (score < 100) {
    animationDuration = 2.5;
    goodCharacterProbability = 0.2;
  } else if (score < 200) {
    animationDuration = 2.1;
    goodCharacterProbability = 0.35;
  } else if (score < 300) {
    animationDuration = 2;
    goodCharacterProbability = 0.4;
  } else if (score < 400) {
    animationDuration = 1.8;
    goodCharacterProbability = 0.45;
  } else if (score < 500) {
    animationDuration = 1.6;
    goodCharacterProbability = 0.5;
  } else if (score < 600) {
    animationDuration = 1.4;
    goodCharacterProbability = 0.5;
  } else if (score < 700) {
    animationDuration = 1.2;
    goodCharacterProbability = 0.5;
  } else if (score < 800) {
    animationDuration = 1;
    goodCharacterProbability = 0.5;
  } else if (score < 900) {
    animationDuration = 1;
    goodCharacterProbability = 0.5;
  } else {
    animationDuration = 1;
    goodCharacterProbability = 0.4;
  }

  return {
    ...currentState,
    score,
    timeLeft,
    spawnInterval,
    isGameOver: false,
    animationDuration,
    goodCharacterProbability,
  };
}
