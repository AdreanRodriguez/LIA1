import "./gameStartModal.css";
import good from "../../assets/goodCharacters/GoodBackLeft.svg";
import evil from "../../assets/evilCharacters/EvilBackLeft.svg";

interface GameOverModalProps {
  startGame: boolean;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GameStartModal({ startGame, setStartGame }: GameOverModalProps) {
  function handleStartGame() {
    setStartGame(false);
  }

  if (!startGame) {
    return null;
  }

  return (
    <>
      <section className="gameStartModal">
        <div className="gameStartModal__wrapper">
          <h2 className="gameStartModal__title">Spelregler SmackAttack</h2>
          <div className="gameStartModal__rule">
            <img className="gameStartModal__image" src={good} alt="Den gode" />
            <p className="gameStartModal__text">Vid tryck på den gode är det Game Over</p>
          </div>
          <div className="gameStartModal__rule">
            <img className="gameStartModal__image" src={evil} alt="Den onde" />
            <p className="gameStartModal__text">Vid tryck på den onde får du 10 poäng</p>
          </div>
          <p className="gameStartModal__good-luck">Lycka till!</p>
          <button className="gameStartModal__play-button" onClick={handleStartGame}>
            SPELA
          </button>
        </div>
      </section>
    </>
  );
}
