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
    1000 // 1000 millisekunder, 1 sekund
  );

  return (
    <>
      <figure className="portrait-blocker__container">
        <img src={rotateDevice} alt="Rotate device image" className="portrait-blocker" />
      </figure>
      <main className="game-container">
        {/* Glöm inte ta bort välkomsttexten när spelet startar */}
        {/* <h1 className="welcome-text">Welcome to SmackAttack</h1> */}
        <h2 className="score__text">
          Score: <span className="score__number">{score}</span>
        </h2>
        {gameOver && <GameOverModal score={score} resetGame={resetGame} />}
        <Bus />
        <Bush left="10" bottom="0" />
        <Bush left="70" bottom="0" />
        {characters.map((character) => (
          <Character
            x={character.x}
            y={character.y}
            id={character.id}
            key={character.id}
            type={character.type}
            angle={character.angle}
            score={character.score}
            animation={character.animation}
            clickedCharacter={character.clickedCharacter}
            onClick={() => handleCharacterClick(character)}
          />
        ))}
      </main>
    </>
  );
}

export default App;
