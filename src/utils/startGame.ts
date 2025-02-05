export const startGame = () => {
  console.log("Game started!");
  if (window.ClubHouseGame) {
    // console.log("Game RUNNING!", window.ClubHouseGame.gameRunning());
    window.ClubHouseGame.gameRunning();
  }
};
