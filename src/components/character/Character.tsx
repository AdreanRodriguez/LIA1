import "./character.css";
import { CharacterType } from "../../types/characterType";

interface CharacterProps {
  characterImage: string;
  character: CharacterType;
  style?: React.CSSProperties;
  size: { width: string; height: string };
  onClick: (character: CharacterType) => void;
}

export default function Character({ character, onClick, characterImage, size }: CharacterProps) {
  const { id, type, angle, animation, clickedCharacter, animationDuration } = character;

  const cartoonCloudImange = "/assets/poff.png";

  const image = clickedCharacter && type === "evil" ? cartoonCloudImange : characterImage;

  const characterStyle: React.CSSProperties = {
    ...size, // Bredd och höjd från `getCharacterData`
    animationName: animation, // Använd animationen som tilldelats
    animationIterationCount: "1", // Animationen körs bara 1 gång
    animationFillMode: "forwards", // Se till att de inte studsar tillbaka
    transform: `rotate(${angle}deg)`, // Gör rotation och centrering
    animationTimingFunction: "ease-in",
    // animationTimingFunction: "ease-in-out",
    animationDuration: `${animationDuration}s`, // Detta sätter vi i gameLogic.ts
  };

  return (
    <div
      className={`${type}-character ${clickedCharacter ? "clickedCharacter" : ""}`}
      style={characterStyle}
      onClick={() => onClick(character)}
    >
      <img
        src={image}
        alt={`${type} character ${clickedCharacter ? "with cartoon cloud" : ""} at ${id}`}
      />
    </div>
  );
}
