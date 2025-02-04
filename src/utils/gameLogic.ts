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
  timeLeft: 15, // Startar med 15 sekunder
  isGameOver: false,
  spawnInterval: 1000, // sekund mellan varje spawn
  animationDuration: 3, // Börja med 3 sekunder
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

  if (score >= 100 && score < 200) {
    animationDuration = 2.5;
    goodCharacterProbability = 0.2;
  } else if (score >= 200 && score < 350) {
    animationDuration = 2.3;
    goodCharacterProbability = 0.35;
  } else if (score >= 350 && score < 550) {
    animationDuration = 2.2;
    goodCharacterProbability = 0.4;
  } else if (score >= 550 && score < 700) {
    animationDuration = 2.1;
    goodCharacterProbability = 0.45;
  } else if (score >= 700 && score < 900) {
    animationDuration = 2;
    goodCharacterProbability = 0.5;
  } else if (score >= 900 && score < 1000) {
    animationDuration = 1.8;
    goodCharacterProbability = 0.5;
  } else if (score >= 1000) {
    animationDuration = 1.5;
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
