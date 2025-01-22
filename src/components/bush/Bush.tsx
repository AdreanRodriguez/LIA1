import "./bush.css";
import bush from "../../assets/bush.svg";
import CharacterBox from "../characterBox/CharacterBox";
import { CharacterType } from "../../types/characterType";

interface BushProps {
  position: "left" | "right"; // Definiera om det är vänster eller höger buske
  characters: CharacterType[]; // Karaktärer för denna buske
  onCharacterClick: (character: CharacterType) => void;
}

const Bush: React.FC<BushProps> = ({ position, characters, onCharacterClick }) => {
  // Definiera position och storlek för karaktärslådorna i busken
  const bushConfig = {
    left: {
      position: { top: "12%", left: "10%" },
      size: { width: "40%", height: "60%" },
    },
    right: {
      position: { top: "12%", left: "10%" },
      size: { width: "40%", height: "60%" },
    },
  };

  const config = bushConfig[position];

  return (
    <div className={`bush-wrapper bush-wrapper-${position}`}>
      <div className={`bush-container bush-${position}`}>
        {/* Här renderar vi buskbilden */}
        <img className="bush" src={bush} alt={`${position} bush`} />
      </div>

      {/* Rendera karaktärer med CharacterBox */}
      {characters.map((character) => (
        <CharacterBox
          key={character.id}
          position={config.position}
          size={config.size}
          character={character}
          onCharacterClick={onCharacterClick}
        />
      ))}
    </div>
  );
};

export default Bush;
