import "./gameboard.css";
import Bus from "../bus/Bus";
import Bush from "../bush/Bush";
import Cloud from "../cloud/Cloud";
import { GameState } from "../../utils/gameLogic";
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
  return (
    <main
      className={`game-container ${
        gameState.isGameOver || !isGameStarted ? "blur-background" : ""
      }`}
    >
      <h2 className="timer__text">
        Tid:
        <span className="timer__number">{gameState.timeLeft}</span>
      </h2>
      <h2 className="score__text">
        Poäng:
        <span className="score__number">{gameState.score}</span>
      </h2>

      <Bus
        characters={activeCharacters}
        onCharacterClick={handleCharacterClick}
        isGameStarted={isGameStarted}
        onAnimationEnd={handleCharacterRemoval}
      />

      <Bush
        position="left"
        characters={activeCharacters.filter((char) => char.id === "bush-left")}
        onCharacterClick={handleCharacterClick}
        onAnimationEnd={handleCharacterRemoval}
      />
      <Bush
        position="right"
        characters={activeCharacters.filter((char) => char.id === "bush-right")}
        onCharacterClick={handleCharacterClick}
        onAnimationEnd={handleCharacterRemoval}
      />

      <Cloud top="0" left="20vw" width="10vw" height="14svh" animationDuration="10s" />
      <Cloud top="0" left="90vw" width="10vw" height="14svh" animationDuration="60s" />
      <Cloud top="0" left="60vw" width="10vw" height="14svh" animationDuration="53s" />
    </main>
  );
};
