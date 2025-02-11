import "./App.css";
import { useEffect, useState } from "react";
import Bus from "./components/bus/Bus";
import Bush from "./components/bush/Bush";
import Cloud from "./components/cloud/Cloud";
import { useGameLogic } from "./hooks/useGameLogic";
import PortraitBlocker from "./components/portraitBlocker/PortraitBlocker";

function App() {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(
    window.matchMedia("(orientation: portrait)").matches
  );

  const { activeCharacters, gameState, handleCharacterClick, handleCharacterRemoval } =
    useGameLogic(isGameStarted, setIsGameStarted);

  useEffect(() => {
    const handleOrientationChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches);
    };

    const mediaQuery = window.matchMedia("(orientation: portrait)");
    mediaQuery.addEventListener("change", handleOrientationChange);

    return () => {
      mediaQuery.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  const uniqueCharacters = Array.from(
    new Map(activeCharacters.map((char) => [char.id, char])).values()
  );
  return (
    <>
      <div id="ui" style={{ display: isPortrait ? "none" : "block" }}></div>
      <div className="loader" id="loader">
        <img className="loader-logo" src="/images/logo.png" />
        <img className="spinner" src="/images/spinner.svg" />
      </div>

      <PortraitBlocker />
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
          onAnimationEnd={handleCharacterRemoval}
        />

        <Bush
          position="left"
          characters={uniqueCharacters.filter((char) => char.id === "bush-left")}
          onCharacterClick={handleCharacterClick}
          onAnimationEnd={handleCharacterRemoval}
        />
        <Bush
          position="right"
          characters={uniqueCharacters.filter((char) => char.id === "bush-right")}
          onCharacterClick={handleCharacterClick}
          onAnimationEnd={handleCharacterRemoval}
        />

        <Cloud top="0" left="20vw" width="10vw" height="14svh" animationDuration="10s" />
        <Cloud top="0" left="90vw" width="10vw" height="14svh" animationDuration="60s" />
        <Cloud top="0" left="60vw" width="10vw" height="14svh" animationDuration="53s" />
      </main>
    </>
  );
}

export default App;
