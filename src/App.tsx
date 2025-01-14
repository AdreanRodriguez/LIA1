import "./App.css";
import Bus from "./components/bus/Bus";
import Bush from "./components/bush/Bush";
import rotateDevice from "./assets/rotateDevice.svg";
import GoodCharacter from "./components/characters/good/GoodCharacter";
import EvilCharacter from "./components/characters/evil/EvilCharacter";

function App() {
  return (
    <>
      <figure className="portrait-blocker__container">
        <img src={rotateDevice} alt="Rotate device image" className="portrait-blocker" />
      </figure>
      <main className="game-container">
        <h1 className="welcome-text">Welcome to SmackAttack</h1>
        <Bus />
        <Bush left="10" bottom="0" />
        <Bush left="70" bottom="0" />
        <GoodCharacter />
        <EvilCharacter />
      </main>
    </>
  );
}

export default App;
