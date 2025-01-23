import "./gameStartModal.css";
import good from "../../assets/goodCharacters/GoodBackLeft.svg";
import evil from "../../assets/evilCharacters/EvilBackLeft.svg";

interface GameOverModalProps {
  startGame: boolean;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GameStartModal({ startGame, setStartGame }: GameOverModalProps) {
  // Starta spelet
  // window.ClubHouseGame.registerRestart(() => {});

  function handleStartGame() {
    setStartGame(false);
  }

  if (!startGame) {
    return null;
  }

  return (
    <>
      <section className="gameStartModal__wrapper">
        <div className="gameStartModal">
          <h2 className="gameStartModal__title">Spelregler SmackAttack</h2>
          <figcaption className="gameStartModal__rule">
            <figure className="gameStartModal__image__container">
              <img className="gameStartModal__image" src={good} alt="Den gode" />
            </figure>
            <p className="gameStartModal__text">Vid tryck på den gode är det Game Over</p>
          </figcaption>
          <figcaption className="gameStartModal__rule">
            <figure className="gameStartModal__image__container">
              <img className="gameStartModal__image" src={evil} alt="Den onde" />
            </figure>
            <p className="gameStartModal__text">Vid tryck på den onde får du 10 poäng</p>
          </figcaption>
          <p className="gameStartModal__good-luck">Lycka till!</p>
          <button className="gameStartModal__play-button" onClick={handleStartGame}>
            SPELA
          </button>
        </div>
      </section>
    </>
  );
}
