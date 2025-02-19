export const gameOver = (score: number) => {
  // Säkerhetskontroll för att undvika krasch om ClubHouseGame inte finns
  if (!window.ClubHouseGame) {
    console.error("ClubHouseGame is not available.");
    return;
  }

  // Sätter poängen själv med setScore
  window.ClubHouseGame.setScore(score);

  // Sätter gameDone = spelet är över
  window.ClubHouseGame.gameDone();
};
