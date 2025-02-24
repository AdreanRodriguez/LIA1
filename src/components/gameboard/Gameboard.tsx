import "./gameboard.css";
import Bus from "../bus/Bus";
import Bush from "../bush/Bush";
// import Cloud from "../cloud/Cloud";
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
  return (
    <main
      className={`gameboard-container ${
        gameState.isGameOver || !isGameStarted ? "blur-background" : ""
      }`}
    >
      <h2 className="gameboard__timer__text">
        Tid:
        <span className="gameboard__timer__number">{gameState.timeLeft}</span>
      </h2>
      <h2 className="gameboard__score__text">
        Poäng:
        <span className="gameboard__score__number">{gameState.score}</span>
      </h2>

      <Bus
        characters={activeCharacters}
        isGameStarted={isGameStarted}
        onCharacterClick={handleCharacterClick}
        onAnimationEnd={handleCharacterRemoval}
      />

      <Bush
        position="left"
        onCharacterClick={handleCharacterClick}
        onAnimationEnd={handleCharacterRemoval}
        characters={activeCharacters.filter((char) => char.positionId === "bush-left")}
      />
      <Bush
        position="right"
        onCharacterClick={handleCharacterClick}
        onAnimationEnd={handleCharacterRemoval}
        characters={activeCharacters.filter((char) => char.positionId === "bush-right")}
      />
    </main>
  );
};
