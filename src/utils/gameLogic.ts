export interface GameState {
  score: number;
  timeLeft: number;
  isGameOver: boolean;
  spawnInterval: number;
  animationDuration: number;
  goodCharacterProbability: number;
}

export function updateGameState(
  currentState: GameState,
  characterType: "good" | "evil"
): GameState {
  let { score, timeLeft, isGameOver, spawnInterval, animationDuration, goodCharacterProbability } =
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
  if (timeLeft === 0) {
    return { ...currentState, timeLeft: 0, isGameOver: true };
  }

  //   // Svårighetsgrad beroende på tid
  //   if (timeLeft >= 25 && timeLeft < 35) {
  //     spawnInterval = 600; // 600 millisekunder
  //     goodCharacterProbability = 0.3; // 35% fler goda
  //   } else if (timeLeft >= 35) {
  //     spawnInterval = 500; // 500 millisekunder
  //     goodCharacterProbability = 0.4; // 45% fler goda
  //   } else if (timeLeft >= 45) {
  //     spawnInterval = 400; // 400 millisekunder
  //     goodCharacterProbability = 0.4; // 40% fler goda
  //   } else if (timeLeft >= 55) {
  //     spawnInterval = 300; // 300 millisekunder
  //     goodCharacterProbability = 0.5; // 50% fler goda
  //   }

  // Svårighetsgrad beroende på poäng
  if (score >= 100 && score < 150) {
    spawnInterval = 650; // 600 millisekunder
    goodCharacterProbability = 0.2; // 20% fler goda
    animationDuration = 2.5; // Antalet sekunder karaktären ska visas
  } else if (score >= 150 && score < 200) {
    spawnInterval = 650; // 500 millisekunder
    goodCharacterProbability = 0.2; // 20% fler goda
    animationDuration = 2.5; // Antalet sekunder karaktären ska visas
  } else if (score >= 200 && score < 250) {
    spawnInterval = 600; // 400 millisekunder
    goodCharacterProbability = 0.3; // 30% fler goda
    animationDuration = 2; // Antalet sekunder karaktären ska visas
  } else if (score >= 300 && score < 350) {
    spawnInterval = 600; // 300 millisekunder
    goodCharacterProbability = 0.3; // 30% fler goda
    animationDuration = 2; // Antalet sekunder karaktären ska visas
  } else if (score >= 400 && score < 450) {
    spawnInterval = 550; // 300 millisekunder
    goodCharacterProbability = 0.35; // 35% fler goda
    animationDuration = 2; // Antalet sekunder karaktären ska visas
  } else if (score >= 450 && score < 550) {
    spawnInterval = 550; // 300 millisekunder
    goodCharacterProbability = 0.35; // 35% fler goda
    animationDuration = 2; // Antalet sekunder karaktären ska visas
  } else if (score >= 550 && score < 600) {
    spawnInterval = 400; // 300 millisekunder
    goodCharacterProbability = 0.4; // 40% fler goda
    animationDuration = 1.8; // Antalet sekunder karaktären ska visas
  } else if (score >= 600 && score < 700) {
    spawnInterval = 400; // 300 millisekunder
    goodCharacterProbability = 0.4; // 40% fler goda
    animationDuration = 1.8; // Antalet sekunder karaktären ska visas
  } else if (score >= 700 && score < 850) {
    spawnInterval = 350; // 300 millisekunder
    goodCharacterProbability = 0.5; // 50% fler goda
    animationDuration = 1.5; // Antalet sekunder karaktären ska visas
  } else if (score >= 850 && score < 900) {
    spawnInterval = 350; // 300 millisekunder
    goodCharacterProbability = 0.5; // 50% fler goda
    animationDuration = 1.5; // Antalet sekunder karaktären ska visas
  } else if (score >= 900 && score < 1000) {
    spawnInterval = 300; // 300 millisekunder
    goodCharacterProbability = 0.6; // 60% fler goda
    animationDuration = 1; // Antalet sekunder karaktären ska visas
  }

  return {
    score,
    timeLeft,
    isGameOver,
    spawnInterval,
    animationDuration,
    goodCharacterProbability,
  };
}
