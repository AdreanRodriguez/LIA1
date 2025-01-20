import "./character.css";
import cartoonCloudImange from "../../assets/poff.svg";
import { CharacterType } from "../../types/characterType";
import { getCharacterData } from "../../utils/getCharacterData";

interface CharacterProps {
  character: CharacterType;
  onClick: (character: CharacterType) => void;
}

export default function Character({ character, onClick }: CharacterProps) {
  const { x, y, id, type, angle, score, animation, clickedCharacter } = character;

  const characterData = getCharacterData(id, type);

  if (!characterData) {
    return null;
  }

  const { characterImage, size } = characterData;

  const image = clickedCharacter && type === "evil" ? cartoonCloudImange : characterImage;

  // const characterStyle = {
  //   top: `${y}%`,
  //   left: `${x}%`,
  //   position: "absolute",
  //   animationName: animation,
  //   transform: `rotate(${angle}deg)`,
  //   ...size, // Bredd och höjd från `getCharacterData`
  // };

  return (
    <div
      className={`${type}-character ${clickedCharacter ? "clickedCharacter" : ""}`}
      style={{
        top: `${y}%`,
        left: `${x}%`,
        position: "absolute",
        animationName: animation,
        transform: `rotate(${angle}deg)`,
        ...size, // Bredd och höjd från `getCharacterData`
      }}
      onClick={() => onClick({ id, type, x, y, angle, clickedCharacter, animation, score })}
    >
      <img
        src={image}
        alt={`${type} character ${clickedCharacter ? "with cartoon cloud" : ""} at ${id}`}
      />
    </div>
  );
}
