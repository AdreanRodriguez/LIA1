import "./characterBox.css";
import Character from "../character/Character";
import { CharacterType } from "../../types/characterType";
import { getCharacterData } from "../../utils/getCharacterData";

interface CharacterBoxProps {
  isBusLeft?: boolean;
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
  isBusLeft,
}) => {
  // Rendera inte något om karaktären inte finns eller inte är synlig
  if (!character || !character.visible) {
    return null;
  }

  if (!character?.id) {
    console.error("CharacterBox received a character with a missing ID:", character);
    return null;
  }

  const characterData = getCharacterData(character.id, character.type);
  if (!characterData) {
    return null; // Rendera inte något om karaktären är null
  } // God är null i getCharacterData under bussen

  // Karaktären god flippas vid id "bus-left" om den är god
  const shouldFlipGood = isBusLeft && character.type === "good";
  // const shouldFlipEvil = isBusRight && character.type === "good";
  const randomFlipGood = !isBusLeft && character.type === "good" && Math.random() < 0.5;

  return (
    <div
      className={`character-box ${shouldFlipGood || randomFlipGood ? "flipped" : ""}`}
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
        />
      )}
    </div>
  );
};

export default CharacterBox;
