export const gameOver = (score: number) => {
  // Säkerhetskontroll för att undvika krasch om ClubHouseGame inte finns
  if (!window.ClubHouseGame) {
    console.error("ClubHouseGame is not available. Using local score.");
    return score; // Returnera bara den lokala poängen
  }

  const finalScore = window.ClubHouseGame.getScore();
  console.log(`Final score: ${finalScore}`);

  // Informera ClubHouseGame att spelet är över
  window.ClubHouseGame.gameDone();
  console.log("ClubHouseGame.gameDone() called!");

  return finalScore;
};
