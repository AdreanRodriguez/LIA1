import "./character.css";
import { CharacterType } from "../../types/characterType";

interface CharacterProps {
  characterImage: string;
  character: CharacterType;
  style?: React.CSSProperties;
  size: { width: string; height: string };
  handleCharacterClick: (character: CharacterType) => void;
  handleCharacterRemoval: (uuid: string) => void;
}

export default function Character({
  size,
  character,
  characterImage,
  handleCharacterClick,
  handleCharacterRemoval,
}: CharacterProps) {
  const cartoonPoofImage = "/assets/poof.png";

  const { positionId, uuid, type, angle, animation, clickedCharacter, animationDuration } =
    character;

  const image = clickedCharacter && type === "evil" ? cartoonPoofImage : characterImage;

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
      onClick={() => handleCharacterClick(character)}
      // När animationen är slut, kör handleCharacterRemoval
      onAnimationEnd={() => handleCharacterRemoval(uuid)}
    >
      <img
        src={image}
        alt={`${type} character ${clickedCharacter ? "with cartoon cloud" : ""} at ${positionId}`}
      />
    </div>
  );
}
