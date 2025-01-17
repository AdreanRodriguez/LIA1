import "./restartButton.css";

interface RestartButtonProps {
  resetGame: () => void;
}

export default function RestartButton({ resetGame }: RestartButtonProps) {
  return (
    <button className="restart-button" onClick={resetGame}>
      Restart
    </button>
  );
}
