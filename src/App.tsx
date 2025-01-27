import "./App.css";
import { useState } from "react";
import Bus from "./components/bus/Bus";
import Bush from "./components/bush/Bush";
import Cloud from "./components/cloud/Cloud";
import { useGameLogic } from "./hooks/useGameLogic";
import rotateDevice from "./assets/rotateDevice.svg";
import GameOverModal from "./components/gameOverModal/GameOverModal";
import GameStartModal from "./components/gameStartModal/GameStartModal";

function App() {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const { characters, score, isGameOver, handleCharacterClick, restartGame } = useGameLogic(
    5, // Max antal karaktärer
    1000, // Spawnar varje sekund, Hur ofta man vill att det ska komma nya karaktärer
    isGameStarted,
    0.2 // Sannolikhet för att en god karaktär visas 20% / 1 av 5
  );

  const uniqueCharacters = Array.from(new Map(characters.map((char) => [char.id, char])).values());

  return (
    <>
      <figure className="portrait-blocker__container">
        <img src={rotateDevice} alt="Rotate device image" className="portrait-blocker" />
      </figure>
      {isGameOver && <GameOverModal score={score} restartGame={restartGame} />}
      {!isGameStarted && <GameStartModal setIsGameStarted={setIsGameStarted} />}
      <main className={`game-container ${isGameOver || !isGameStarted ? "blur-background" : null}`}>
        <h2 className="score__text">
          Score: <span className="score__number">{score}</span>
        </h2>
        <Bus
          characters={characters}
          onCharacterClick={handleCharacterClick}
          animation={isGameStarted}
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
        <Cloud top="0" left="20vw" width="5vw" height="14vh" animationDuration="10s" />
        <Cloud top="0" left="90vw" width="10vw" height="14vh" animationDuration="60s" />
        <Cloud top="0" left="60vw" width="15vw" height="14vh" animationDuration="53s" />
      </main>
    </>
  );
}

export default App;
