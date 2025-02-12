export const startGame = (
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
  resetGameState: () => void
) => {
  if (!window.ClubHouseGame) {
    console.error("ClubHouseGame is not available.");
  }

  window.ClubHouseGame.registerRestart(() => {
    resetGameState();
    setIsGameStarted(true);
  });
};
