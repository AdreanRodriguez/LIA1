import "./App.css";
import { useEffect, useState } from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import { Gameboard } from "./components/gameboard/Gameboard";
import PortraitBlocker from "./components/portraitBlocker/PortraitBlocker";

function App() {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(
    window.matchMedia("(orientation: portrait)").matches
  );

  const { activeCharacters, gameState, handleCharacterClick, handleCharacterRemoval, isGameReady } =
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

  return (
    <>
      <div id="ui" style={{ display: isPortrait ? "none" : "block" }}></div>
      <div className="loader" id="loader">
        <img className="loader-logo" src="/images/logo.png" />
        <img className="spinner" src="/images/spinner.svg" />
      </div>

      <PortraitBlocker />

      {isGameReady && (
        <Gameboard
          gameState={gameState}
          isGameStarted={isGameStarted}
          activeCharacters={activeCharacters}
          handleCharacterClick={handleCharacterClick}
          handleCharacterRemoval={handleCharacterRemoval}
        />
      )}
    </>
  );
}

export default App;
