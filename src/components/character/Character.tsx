import "./character.css";
import { CharacterType } from "../../types/characterType";
// import cartoonCloudImange from "/assets/poff.svg";

interface CharacterProps {
  characterImage: string;
  character: CharacterType;
  style?: React.CSSProperties;
  size: { width: string; height: string };
  onClick: (character: CharacterType) => void;
}

export default function Character({ character, onClick, characterImage, size }: CharacterProps) {
  const { id, type, angle, score, animation, clickedCharacter, visible } = character;

  // Kontrollera om karaktären är synlig
  if (!visible) {
    console.error(`Skipping render for character with ID: ${id}`);
    return null; // Rendera inte karaktären om `visible` är false
  }

  const cartoonCloudImange = "/assets/poff.svg";

  const image = clickedCharacter && type === "evil" ? cartoonCloudImange : characterImage;

  const characterStyle: React.CSSProperties = {
    ...size, // Bredd och höjd från `getCharacterData`
    transform: `rotate(${angle}deg)`, // Gör rotation och centrering
    animationName: animation, // Använd animationen som tilldelats
    animationDuration: "2s", // Se till att det tar tillräckligt lång tid
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "1",
    animationFillMode: "forwards", // Se till att de inte studsar tillbaka
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
