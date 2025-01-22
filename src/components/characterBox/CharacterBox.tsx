import "./characterBox.css";
import Character from "../character/Character";
import { CharacterType } from "../../types/characterType";

interface CharacterBoxProps {
  character?: CharacterType; // Karaktär som visas i denna slot
  position: { top: string; left: string }; // Position i förhållande till bussen
  size: { width: string; height: string }; // Storlek på lådan
  onCharacterClick: (character: CharacterType) => void;
  style?: React.CSSProperties; // Valfri stil
}

const CharacterBox: React.FC<CharacterBoxProps> = ({
  character,
  position,
  size,
  onCharacterClick,
  style,
}) => {
  return (
    <div
      className="character-box"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: size.width, // Bredd från prop
        height: size.height, // Höjd från prop
        pointerEvents: "none", // Förhindrar klick på lådan
        ...style,
      }}
    >
      {character && (
        <Character
          character={character}
          onClick={onCharacterClick}
          style={{ pointerEvents: "auto" }}
        />
      )}
    </div>
  );
};

export default CharacterBox;
