import "./characterBox.css";
import Character from "../character/Character";
import { CharacterType } from "../../types/characterType";
import { getCharacterData } from "../../gameLogic/getCharacterData";

interface CharacterBoxProps {
  isBusLeft?: boolean;
  character?: CharacterType; // Karaktär som visas i denna slot
  style?: React.CSSProperties; // Valfri stil
  size: { width: string; height: string }; // Storlek på lådan
  position: { top: string; left: string };
  handleCharacterRemoval: (uuid: string) => void;
  handleCharacterClick: (character: CharacterType) => void;
}

const CharacterBox: React.FC<CharacterBoxProps> = ({
  size,
  style,
  position,
  character,
  handleCharacterClick,
  handleCharacterRemoval,
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

  const characterBoxStyle: React.CSSProperties = {
    ...style,
    width: size.width,
    top: position.top,
    height: size.height,
    left: position.left,
    position: "absolute",
  };

  return (
    <div className="character-box" style={characterBoxStyle}>
      {character && (
        <Character
          character={character}
          size={characterData.size}
          handleCharacterClick={handleCharacterClick}
          characterImage={characterData.characterImage}
          handleCharacterRemoval={handleCharacterRemoval}
        />
      )}
    </div>
  );
};

export default CharacterBox;
