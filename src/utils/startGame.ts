export const startGame = (
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
  resetGameState: () => void
) => {
  console.log("Game started!");

  if (!window.ClubHouseGame) {
    console.error("ClubHouseGame is not available.");
  }

  window.ClubHouseGame.registerRestart(() => {
    console.log("startGame()");
    resetGameState();
    setIsGameStarted(true);
  });
};
