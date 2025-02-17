import "./App.css";
import { useGameLogic } from "./hooks/useGameLogic";
import { Gameboard } from "./components/gameboard/Gameboard";
import PortraitBlocker from "./components/portraitBlocker/PortraitBlocker";

function App() {
  const {
    gameState,
    isGameReady,
    isGameStarted,
    activeCharacters,
    handleCharacterClick,
    handleCharacterRemoval,
  } = useGameLogic();

  return (
    <>
      <div id="ui"></div>
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
