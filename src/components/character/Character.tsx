import "./character.css";
import cartoonCloudImange from "../../assets/poff.svg";
import { CharacterType } from "../../types/characterType";
import { getCharacterData } from "../../utils/getCharacterData";

interface CharacterProps {
  character: CharacterType;
  style?: React.CSSProperties;
  onClick: (character: CharacterType) => void;
}

export default function Character({ character, onClick, style }: CharacterProps) {
  const { id, type, angle, score, animation, clickedCharacter, visible } = character;

  // Kontrollera om karaktären är synlig
  if (!visible) {
    console.error(`Skipping render for character with ID: ${id}`);
    return null; // Rendera inte karaktären om `visible` är false
  }

  const characterData = getCharacterData(id, type);

  if (!characterData) {
    console.error("No characterData");
    return null;
  }

  const { characterImage, size } = characterData;

  const image = clickedCharacter && type === "evil" ? cartoonCloudImange : characterImage;

  const characterStyle: React.CSSProperties = {
    // ...style, // Möjlighet att skicka in ytterligare dynamiska stilar
    ...size, // Bredd och höjd från `getCharacterData`
    // transform: `rotate(${angle}deg)`, // Gör rotation och centrering
    animationName: character.animation,
    // zIndex: (id.includes("bush") && id === "bus-left") || id === "bus-right" ? 0 : 0, // Ser till att busk-karaktärer ligger bakom
    zIndex: 0,
  };

  return (
    <div
      className={`${type}-character ${clickedCharacter ? "clickedCharacter" : ""}`}
      style={characterStyle}
      onClick={() => onClick({ id, type, angle, clickedCharacter, animation, score, visible })}
    >
      <img
        src={image}
        alt={`${type} character ${clickedCharacter ? "with cartoon cloud" : ""} at ${id}`}
      />
    </div>
  );
}
