import "./gameStartModal.css";
import { startGame } from "../../utils/startGame";
import good from "../../assets/goodCharacters/good.png";
import evil from "../../assets/evilCharacters/evil.png";

interface GameOverModalProps {
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GameStartModal({ setIsGameStarted }: GameOverModalProps) {
  function handleStartGame() {
    startGame();
    setIsGameStarted(true);
  }

  return (
    <>
      <section className="gameStartModal__wrapper">
        <div className="gameStartModal">
          <h1 className="gameStartModal__title">SmackAttack</h1>
          <figcaption className="gameStartModal__rule">
            <figure className="gameStartModal__image__container">
              <img className="gameStartModal__image" src={good} alt="Den gode" />
            </figure>
            <p className="gameStartModal__text">Vid tryck på den gode = Game Over</p>
          </figcaption>

          <figcaption className="gameStartModal__rule">
            <figure className="gameStartModal__image__container">
              <img className="gameStartModal__image" src={evil} alt="Den onde" />
            </figure>
            <p className="gameStartModal__text">Vid tryck på den onde = 10 Poäng</p>
          </figcaption>

          <p className="gameStartModal__good-luck">Lycka till!</p>

          <button className="gameStartModal__play-button" onClick={handleStartGame}>
            SPELA
          </button>
          <p className="gameStartModal__collaboration">
            Illustratör:
            <a href="https://www.instagram.com/jimmieslice/" target="_blank">
              JimmieSlice
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
