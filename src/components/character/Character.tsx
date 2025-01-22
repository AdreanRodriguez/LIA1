import "./character.css";
import cartoonCloudImange from "../../assets/poff.svg";
import { CharacterType } from "../../types/characterType";
import { getCharacterData } from "../../utils/getCharacterData";

interface CharacterProps {
  character: CharacterType;
  onClick: (character: CharacterType) => void;
  style?: React.CSSProperties;
}

export default function Character({ character, onClick, style }: CharacterProps) {
  const { x, y, id, type, angle, score, animation, clickedCharacter } = character;

  const characterData = getCharacterData(id, type);

  if (!characterData) {
    return null;
  }

  const { characterImage, size } = characterData;

  const image = clickedCharacter && type === "evil" ? cartoonCloudImange : characterImage;

  const characterStyle: React.CSSProperties = {
    ...style, // Möjlighet att skicka in ytterligare dynamiska stilar
    ...size, // Bredd och höjd från `getCharacterData`, dynamisk storlek
    top: "0%",
    left: "0%",
    objectFit: "cover",
    position: "absolute", // Placera karaktären relativt till CharacterBox
    animationName: animation, // Dynamisk animation för karaktären
    transform: `rotate(${angle}deg)`, // Gör rotation och centrering
    zIndex: id.includes("bush") ? 0 : 1, // Ser till att busk-karaktärer ligger bakom
  };

  return (
    <div
      className={`${type}-character ${clickedCharacter ? "clickedCharacter" : ""}`}
      style={characterStyle}
      onClick={() => onClick({ id, type, x, y, angle, clickedCharacter, animation, score })}
    >
      <img
        src={image}
        alt={`${type} character ${clickedCharacter ? "with cartoon cloud" : ""} at ${id}`}
      />
    </div>
  );
}
