import "./character.css";
import cartoonCloudImange from "../../assets/poff.svg";
import { CharacterType } from "../../types/characterType";
import { getCharacterData } from "../../utils/getCharacterData";

interface CharacterProps extends CharacterType {
  onClick: (character: CharacterType) => void;
}

export default function Character({
  x,
  y,
  id,
  type,
  score,
  angle,
  animation,
  clickedCharacter,
  onClick,
}: CharacterProps) {
  const { characterImage, size } = getCharacterData(id, type);

  // Välj rätt bild
  const image = clickedCharacter && type === "evil" ? cartoonCloudImange : characterImage;

  return (
    <div
      className={`${type}-character ${clickedCharacter ? "clickedCharacter" : ""}`}
      style={{
        top: `${y}%`,
        left: `${x}%`,
        position: "absolute",
        animationName: animation,
        transform: `rotate(${angle}deg)`,
        ...size,
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
