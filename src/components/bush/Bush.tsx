import "./bush.css";
import CharacterBox from "../characterBox/CharacterBox";
import { CharacterType } from "../../types/characterType";

interface BushProps {
  position: "left" | "right"; // Definiera om det är vänster eller höger buske
  characters: CharacterType[]; // Karaktärer för denna buske
  onAnimationEnd: (uuid: string) => void;
  onCharacterClick: (character: CharacterType) => void;
}

const Bush: React.FC<BushProps> = ({ position, characters, onCharacterClick, onAnimationEnd }) => {
  const boxes = {
    left: {
      position: { top: "-60%", left: "30%" },
      size: { width: "50%", height: "100%" },
    },
    right: {
      position: { top: "-60%", left: "30%" },
      size: { width: "50%", height: "100%" },
    },
  };

  // Välj rätt konfiguration baserat på `position`
  const selectedBox = boxes[position];

  if (!selectedBox) {
    console.error(`No box configuration found for bush-${position}`);
    return null;
  }

  return (
    <section className={`bush-wrapper bush-wrapper-${position}`}>
      <img className="bush" src="/assets/bush/bush.png" alt={`${position} bush`} />
      {characters.map((character) => {
        return (
          <CharacterBox
            key={character.uuid}
            character={character}
            size={selectedBox.size}
            position={selectedBox.position}
            onCharacterClick={onCharacterClick}
            onAnimationEnd={onAnimationEnd}
          />
        );
      })}
    </section>
  );
};

export default Bush;
