export const restartGame = (resetGameState: () => void) => {
  if (!window.ClubHouseGame) {
    console.error("ClubHouseGame API not found!");
    return;
  }

  window.ClubHouseGame.registerRestart(() => {
    resetGameState();
  });
};
