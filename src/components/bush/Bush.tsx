import "./bush.css";
import CharacterBox from "../characterBox/CharacterBox";
import { CharacterType } from "../../types/characterType";

interface BushProps {
  position: "left" | "right"; // Definiera om det är vänster eller höger buske
  characters: CharacterType[]; // Karaktärer för denna buske
  handleCharacterRemoval: (uuid: string) => void;
  handleCharacterClick: (character: CharacterType) => void;
}

const Bush: React.FC<BushProps> = ({
  position,
  characters,
  handleCharacterClick,
  handleCharacterRemoval,
}) => {
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

  const character = characters.find((char) => char.positionId === `bush-${position}`);

  return (
    <section className={`bush-wrapper bush-wrapper-${position}`}>
      <img className="bush" src="/assets/bush/bush.png" alt={`${position} bush`} />
      {character && (
        <CharacterBox
          key={character.uuid}
          character={character}
          size={selectedBox.size}
          position={selectedBox.position}
          handleCharacterClick={handleCharacterClick}
          handleCharacterRemoval={handleCharacterRemoval}
        />
      )}
    </section>
  );
};

export default Bush;
