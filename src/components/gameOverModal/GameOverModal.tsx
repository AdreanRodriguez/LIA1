import "./gameOverModal.css";
import Button from "../button/Button";

interface GameOverModalProps {
  score: number;
  onClick?: () => void;
  restartGame: () => void;
}

export default function GameOverModal({ score, restartGame }: GameOverModalProps) {
  return (
    <section className="gameOverModal">
      <div className="gameOverModal__content">
        <h2 className="gameOverModal__text">Game Over</h2>
        <p className="gameOverModal__score__text">
          Poäng: <span className="gameOverModal__score__number">{score}</span>
        </p>
        <Button className={"gameOverModal__button"} onClick={restartGame} name="Restart" />
      </div>
    </section>
  );
}
