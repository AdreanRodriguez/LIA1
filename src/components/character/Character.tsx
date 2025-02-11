import "./character.css";
import { CharacterType } from "../../types/characterType";

interface CharacterProps {
  characterImage: string;
  character: CharacterType;
  style?: React.CSSProperties;
  onAnimationEnd?: (uuid: string) => void;
  size: { width: string; height: string };
  onClick: (character: CharacterType) => void;
}

export default function Character({
  character,
  onClick,
  characterImage,
  size,
  onAnimationEnd,
}: CharacterProps) {
  const cartoonCloudImange = "/assets/poff.png";

  const { id, uuid, type, angle, animation, clickedCharacter, animationDuration } = character;

  const image = clickedCharacter && type === "evil" ? cartoonCloudImange : characterImage;

  const characterStyle: React.CSSProperties = {
    ...size, // Bredd och höjd från `getCharacterData`
    animationName: animation, // Använd animationen som tilldelats
    animationIterationCount: "1", // Animationen körs bara 1 gång
    animationFillMode: "forwards", // Se till att de inte studsar tillbaka
    transform: `rotate(${angle}deg)`, // Gör rotation och centrering
    animationTimingFunction: "ease-in-out",
    animationDuration: `${animationDuration}s`, // Detta sätter vi i gameLogic.ts
  };

  return (
    <div
      className={`${type}-character ${clickedCharacter ? "clickedCharacter" : ""}`}
      style={characterStyle}
      onClick={() => onClick(character)}
      onAnimationEnd={() => {
        console.log(`Animation ended for character with uuid: ${uuid}`);
        if (onAnimationEnd) {
          onAnimationEnd(uuid);
        }
      }}
    >
      <img
        src={image}
        alt={`${type} character ${clickedCharacter ? "with cartoon cloud" : ""} at ${id}`}
      />
    </div>
  );
}
