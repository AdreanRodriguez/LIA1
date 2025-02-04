export const gameOver = (score: number) => {
  // Säkerhetskontroll för att undvika krasch om ClubHouseGame inte finns
  if (!window.ClubHouseGame) {
    console.error("ClubHouseGame is not available.");
    return;
  }

  // console.log(`Final score: ${score}`);
  window.ClubHouseGame.setScore(score);

  // Informera ClubHouseGame att spelet är över
  window.ClubHouseGame.gameDone();
  // console.log("ClubHouseGame.gameDone() called!");
};
