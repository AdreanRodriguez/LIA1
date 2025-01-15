import "./character.css";
import { CharacterType } from "../../types/characterType";
import { getCharacterImage } from "../../utils/getCharacterImage";

interface CharacterProps extends CharacterType {
  onClick: (type: "good" | "evil") => void;
}

export default function Character({ id, x, y, angle, type, animation, onClick }: CharacterProps) {
  const image = getCharacterImage(id, type);

  return (
    <div
      className={`${type}-character`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `rotate(${angle}deg)`,
        position: "absolute",
        animationName: animation,
      }}
      onClick={() => onClick(type)}
    >
      <img src={image} alt={`${type} character at ${id}`} />
    </div>
  );
}
