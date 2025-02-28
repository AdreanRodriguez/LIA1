import "./gameboard.css";
import Bus from "../bus/Bus";
import Bush from "../bush/Bush";
import { GameState } from "../../gameLogic/gameLogic";
import { CharacterType } from "../../types/characterType";
import { useState } from "react";

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
  const [feedbackEffect, setFeedbackEffect] = useState(""); // Feedback till användaren i färg

  function handleClick(character: CharacterType) {
    if (character.clickedCharacter) return;

    setFeedbackEffect(character.type === "evil" ? "feedback-green" : "feedback-red");

    setTimeout(() => {
      setFeedbackEffect("");
    }, 100); // Ta bort effekten efter 100ms

    handleCharacterClick(character);
  }

  return (
    <main
      className={`gameboard-container ${
        gameState.isGameOver || !isGameStarted ? "blur-background" : ""
      }`}
    >
      <h2 className={`gameboard__timer__text ${feedbackEffect}`}>
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
        onCharacterClick={handleClick}
        handleCharacterRemoval={handleCharacterRemoval}
      />

      <Bush
        position="left"
        characters={activeCharacters}
        onCharacterClick={handleClick}
        handleCharacterRemoval={handleCharacterRemoval}
      />
      <Bush
        position="right"
        characters={activeCharacters}
        onCharacterClick={handleClick}
        handleCharacterRemoval={handleCharacterRemoval}
      />
    </main>
  );
};
