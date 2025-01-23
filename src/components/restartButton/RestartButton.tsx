import "./restartButton.css";

interface RestartButtonProps {
  restartGame: () => void;
}

export default function RestartButton({ restartGame }: RestartButtonProps) {
  return (
    <button className="restart-button" onClick={restartGame}>
      Restart
    </button>
  );
}
