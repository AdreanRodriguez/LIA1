import "./App.css";
import Bus from "./components/bus/Bus";
import Bush from "./components/bush/Bush";
import { useGameLogic } from "./hooks/useGameLogic";
import rotateDevice from "./assets/rotateDevice.svg";
import Character from "./components/character/Character";

function App() {
  const { characters, score, gameOver, handleCharacterClick } = useGameLogic(5, 1000);

  return (
    <>
      <figure className="portrait-blocker__container">
        <img src={rotateDevice} alt="Rotate device image" className="portrait-blocker" />
      </figure>
      <main className="game-container">
        <h1 className="welcome-text">Welcome to SmackAttack</h1>
        <h2>Score: {score}</h2>
        {gameOver && <h2>Game Over! Click to Restart</h2>}
        <Bus />
        <Bush left="10" bottom="0" />
        <Bush left="70" bottom="0" />
        {characters.map((char) => (
          <Character
            key={char.id}
            type={char.type}
            id={char.id}
            x={char.x}
            y={char.y}
            angle={char.angle}
            points={char.points}
            animation={char.animation}
            onClick={handleCharacterClick}
          />
        ))}
      </main>
    </>
  );
}

export default App;
