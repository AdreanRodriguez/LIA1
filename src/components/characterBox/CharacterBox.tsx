import "./characterBox.css";
import Character from "../character/Character";
import { CharacterType } from "../../types/characterType";

interface CharacterBoxProps {
  character?: CharacterType; // Karaktär som visas i denna slot
  style?: React.CSSProperties; // Valfri stil
  position: { top: string; left: string }; // Position i förhållande till bussen
  size: { width: string; height: string }; // Storlek på lådan
  onCharacterClick: (character: CharacterType) => void;
}

const CharacterBox: React.FC<CharacterBoxProps> = ({
  character,
  position,
  size,
  onCharacterClick,
  style,
}) => {
  // Kolla om `character` är null eller undefined
  if (!character) {
    return null;
  }

  if (!character?.id) {
    console.error("CharacterBox received a character with a missing ID:", character);
    return null;
  }

  return (
    <div
      className="character-box"
      style={{
        ...style,
        width: size.width,
        top: position.top,
        height: size.height,
        left: position.left,
        position: "absolute",
        pointerEvents: "none", // Förhindrar klick på lådan
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
