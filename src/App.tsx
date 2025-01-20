import "./App.css";
import { useState } from "react";
import Bus from "./components/bus/Bus";
import Bush from "./components/bush/Bush";
import { useGameLogic } from "./hooks/useGameLogic";
import rotateDevice from "./assets/rotateDevice.svg";
import Character from "./components/character/Character";
import GameOverModal from "./components/gameOverModal/GameOverModal";
import GameStartModal from "./components/gameStartModal/GameStartModal";
import Cloud from "./components/cloud/Cloud";

function App() {
  const [startGame, setStartGame] = useState<boolean>(true);
  const { characters, score, gameOver, handleCharacterClick, resetGame } = useGameLogic(
    5, // Max antal karaktärer
    1000, // Spawnar varje sekund, Hur ofta man vill att det ska komma nya karaktärer
    startGame,
    0.2 // Sannolikhet för att en god karaktär visas 20% / 1 av 5
  );

  return (
    <>
      <figure className="portrait-blocker__container">
        <img src={rotateDevice} alt="Rotate device image" className="portrait-blocker" />
      </figure>
      <Cloud />
      {gameOver && <GameOverModal score={score} resetGame={resetGame} />}
      {startGame && <GameStartModal startGame={startGame} setStartGame={setStartGame} />}
      <main className={`game-container ${gameOver || startGame ? "blur-background" : null}`}>
        <h2 className="score__text">
          Score: <span className="score__number">{score}</span>
        </h2>
        <Bus>
          {characters.map((character) => (
            <Character
              key={character.id}
              character={character}
              onClick={() => handleCharacterClick(character)}
            />
          ))}
        </Bus>
        <Bush position="left" />
        <Bush position="right" />
      </main>
    </>
  );
}

export default App;
