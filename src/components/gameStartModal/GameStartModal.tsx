import "./gameStartModal.css";
import { startGame } from "../../utils/startGame";
import Button from "../button/Button";

interface GameOverModalProps {
  onClick?: () => void;
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

          <figcaption className="gameStartModal__rule__good">
            <figure className="gameStartModal__image__container">
              <img
                className="gameStartModal__image"
                src="/assets/goodCharacters/good.png"
                alt="Den gode"
              />
            </figure>
            <p className="gameStartModal__text">- 3 sekunder</p>
          </figcaption>

          <figcaption className="gameStartModal__rule__evil">
            <p className="gameStartModal__text">10 Poäng + 2 sekunder</p>
            <figure className="gameStartModal__image__container">
              <img
                className="gameStartModal__image"
                src="/assets/evilCharacters/evil.png"
                alt="Den onde"
              />
            </figure>
          </figcaption>

          {/* <p className="gameStartModal__good-luck">Lycka till!</p> */}

          <Button
            // className="gameStartModal__play-button"
            onClick={handleStartGame}
            name="SPELA"
          />
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
