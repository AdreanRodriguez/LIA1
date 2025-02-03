import "./character.css";
// import cartoonCloudImange from "/assets/poff.svg";
import { CharacterType } from "../../types/characterType";

interface CharacterProps {
  characterImage: string;
  character: CharacterType;
  style?: React.CSSProperties;
  size: { width: string; height: string };
  onClick: (character: CharacterType) => void;
}

export default function Character({ character, onClick, characterImage, size }: CharacterProps) {
  const { id, type, angle, animation, clickedCharacter, visible, animationDuration } = character;

  // Kontrollera om karaktären är synlig
  if (!visible) {
    console.error(`Skipping render for character with ID: ${id}`);
    return null; // Rendera inte karaktären om `visible` är false
  }

  const cartoonCloudImange = "/assets/poff.png";

  const image = clickedCharacter && type === "evil" ? cartoonCloudImange : characterImage;

  const characterStyle: React.CSSProperties = {
    ...size, // Bredd och höjd från `getCharacterData`
    transform: `rotate(${angle}deg)`, // Gör rotation och centrering
    animationName: animation, // Använd animationen som tilldelats
    animationDuration: `${animationDuration}s`, // Detta sätter vi i gameLogic.ts
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "1", // Animationen körs bara 1 gång
    animationFillMode: "forwards", // Se till att de inte studsar tillbaka
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
