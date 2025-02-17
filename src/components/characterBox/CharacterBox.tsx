import "./characterBox.css";
import Character from "../character/Character";
import { CharacterType } from "../../types/characterType";
import { getCharacterData } from "../../utils/getCharacterData";

interface CharacterBoxProps {
  isBusLeft?: boolean;
  character?: CharacterType; // Karaktär som visas i denna slot
  style?: React.CSSProperties; // Valfri stil
  size: { width: string; height: string }; // Storlek på lådan
  position: { top: string; left: string };
  onCharacterClick: (character: CharacterType) => void;
  onAnimationEnd: (uuid: string) => void;
}

const CharacterBox: React.FC<CharacterBoxProps> = ({
  size,
  style,
  position,
  character,
  onAnimationEnd,
  onCharacterClick,
}) => {
  // Rendera inte något om karaktären inte finns eller inte är synlig
  if (!character) {
    return null;
  }

  if (!character?.positionId) {
    console.error("CharacterBox received a character with a missing ID:", character);
    return null;
  }

  const characterData = getCharacterData(character.positionId, character.type);
  if (!characterData) {
    return null; // Rendera inte något om karaktären är null
  } // God är null i getCharacterData under bussen

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
      }}
    >
      {character && (
        <Character
          character={character}
          onClick={onCharacterClick}
          characterImage={characterData.characterImage}
          size={characterData.size}
          onAnimationEnd={onAnimationEnd}
        />
      )}
    </div>
  );
};

export default CharacterBox;
