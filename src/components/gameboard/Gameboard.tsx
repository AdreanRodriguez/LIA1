import "./gameboard.css";
import Bus from "../bus/Bus";
import Bush from "../bush/Bush";
import { useEffect, useState } from "react";
import { GameState } from "../../gameLogic/gameLogic";
import { CharacterType } from "../../types/characterType";

interface GameboardProps {
  gameState: GameState;
  isGameStarted: boolean;
  activeCharacters: CharacterType[];
  handleCharacterRemoval: (uuid: string) => void;
  handleCharacterClick: (character: CharacterType) => void;
}

export const Gameboard: React.FC<GameboardProps> = ({
  gameState,
  isGameStarted,
  activeCharacters,
  handleCharacterClick,
  handleCharacterRemoval,
}) => {
  const [timePulse, setTimePulse] = useState(false);
  const [feedbackEffect, setFeedbackEffect] = useState(""); // Feedback till användaren i färg

  function handleClick(character: CharacterType) {
    if (character.clickedCharacter) return;

    setFeedbackEffect(character.type === "evil" ? "feedback-green" : "feedback-red");

    setTimeout(() => {
      setFeedbackEffect("");
    }, 100); // Ta bort effekten efter 100ms

    handleCharacterClick(character);
  }

  useEffect(() => {
    if (gameState.timeLeft <= 5 && !gameState.isGameOver) {
      setTimePulse(true);
    } else {
      setTimePulse(false);
    }
  }, [gameState.timeLeft, gameState.isGameOver]);

  return (
    <main
      className={`gameboard-container ${
        gameState.isGameOver || !isGameStarted ? "blur-background" : ""
      }`}
    >
      <h2 className={`gameboard__timer__text ${feedbackEffect} ${timePulse ? "time-pulse" : ""}`}>
        Tid:
        <span className="gameboard__timer__number">{gameState.timeLeft}</span>
      </h2>

      <h2 className={`gameboard__score__text ${feedbackEffect}`}>
        Poäng:
        <span className="gameboard__score__number">{gameState.score}</span>
      </h2>

      <Bus
        characters={activeCharacters}
        isGameStarted={isGameStarted}
        handleCharacterClick={handleClick}
        handleCharacterRemoval={handleCharacterRemoval}
      />

      <Bush
        position="left"
        characters={activeCharacters}
        handleCharacterClick={handleClick}
        handleCharacterRemoval={handleCharacterRemoval}
      />
      <Bush
        position="right"
        characters={activeCharacters}
        handleCharacterClick={handleClick}
        handleCharacterRemoval={handleCharacterRemoval}
      />
    </main>
  );
};
