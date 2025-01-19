import "./App.css";
import Bus from "./components/bus/Bus";
import Bush from "./components/bush/Bush";
import { useGameLogic } from "./hooks/useGameLogic";
import rotateDevice from "./assets/rotateDevice.svg";
import Character from "./components/character/Character";
import GameOverModal from "./components/gameOverModal/GameOverModal";

function App() {
  const { characters, score, gameOver, handleCharacterClick, resetGame } = useGameLogic(
    5, // Max antal karaktärer
    1000 // Spawnar varje sekund, Hur ofta man vill att det ska komma nya karaktärer
  );

  return (
    <>
      <figure className="portrait-blocker__container">
        <img src={rotateDevice} alt="Rotate device image" className="portrait-blocker" />
      </figure>
      <main className="game-container">
        {/* Glöm inte ta bort välkomsttexten när spelet startar */}
        {score === 0 && <h1 className="welcome-text">SmackAttack</h1>}
        <h2 className="score__text">
          Score: <span className="score__number">{score}</span>
        </h2>
        {gameOver && <GameOverModal score={score} resetGame={resetGame} />}
        <Bus />
        <Bush position="left" />
        <Bush position="right" />
        {characters.map((character) => (
          <Character
            key={character.id}
            character={character}
            onClick={() => handleCharacterClick(character)}
          />
        ))}
      </main>
    </>
  );
}

export default App;
