import "./App.css";
import { useState } from "react";
import Bus from "./components/bus/Bus";
import Bush from "./components/bush/Bush";
import Cloud from "./components/cloud/Cloud";
import { useGameLogic } from "./hooks/useGameLogic";
import GameOverModal from "./components/gameOverModal/GameOverModal";
import GameStartModal from "./components/gameStartModal/GameStartModal";
import PortraitBlocker from "./components/portraitBlocker/PortraitBlocker";

function App() {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const { activeCharacters, gameState, handleCharacterClick, restartGame, isGameReady } =
    useGameLogic(60, isGameStarted);

  if (!isGameReady) {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );
  }

  const uniqueCharacters = Array.from(
    new Map(activeCharacters.map((char) => [char.id, char])).values()
  );

  return (
    <>
      <PortraitBlocker />
      {gameState.isGameOver && <GameOverModal score={gameState.score} restartGame={restartGame} />}
      {!isGameStarted && <GameStartModal setIsGameStarted={setIsGameStarted} />}
      <main
        className={`game-container ${
          gameState.isGameOver || !isGameStarted ? "blur-background" : null
        }`}
      >
        <h2 className="timer__text">
          Tid:
          <span className="timer__number">{gameState.timeLeft}</span>
        </h2>
        <h2 className="score__text">
          Poäng:
          <span className="score__number">{gameState.score}</span>
        </h2>

        <Bus
          characters={activeCharacters}
          onCharacterClick={handleCharacterClick}
          isGameStarted={isGameStarted}
        />

        <Bush
          position="left"
          characters={uniqueCharacters.filter((char) => char.id === "bush-left")}
          onCharacterClick={handleCharacterClick}
        />
        <Bush
          position="right"
          characters={uniqueCharacters.filter((char) => char.id === "bush-right")}
          onCharacterClick={handleCharacterClick}
        />

        <Cloud top="-10vh" left="30vw" width="20vw" height="25vh" animationDuration="82s" />
        <Cloud top="0" left="20vw" width="10vw" height="14vh" animationDuration="10s" />
        <Cloud top="0" left="90vw" width="10vw" height="14vh" animationDuration="60s" />
        <Cloud top="0" left="60vw" width="10vw" height="14vh" animationDuration="53s" />
      </main>
    </>
  );
}

export default App;
