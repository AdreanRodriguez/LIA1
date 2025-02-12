import "./bush.css";
import CharacterBox from "../characterBox/CharacterBox";
import { CharacterType } from "../../types/characterType";

interface BushProps {
  position: "left" | "right"; // Definiera om det är vänster eller höger buske
  characters: CharacterType[]; // Karaktärer för denna buske
  onCharacterClick: (character: CharacterType) => void;
  onAnimationEnd: (uuid: string) => void;
}

const Bush: React.FC<BushProps> = ({ position, characters, onCharacterClick, onAnimationEnd }) => {
  const boxes = {
    left: {
      position: { top: "-25%", left: "33%" },
      size: { width: "35%", height: "100%" },
    },
    right: {
      position: { top: "-25%", left: "33%" },
      size: { width: "35%", height: "100%" },
    },
  };

  // Välj rätt konfiguration baserat på `position`
  const selectedBox = boxes[position];

  if (!selectedBox) {
    console.error(`No box configuration found for bush-${position}`);
    return null;
  }

  // Filtrera ut ogiltiga karaktärer
  const validCharacters = characters.filter((character) => character && character.id);

  return (
    <div className={`bush-wrapper bush-wrapper-${position}`}>
      <div className={`bush-container bush-${position}`}>
        {/* Här renderar vi buskbilden */}
        <img className="bush" src="/assets/bush/bush.png" alt={`${position} bush`} />
      </div>
      {/* Rendera karaktärer */}
      {validCharacters.map((character) => {
        // console.log(`${character.id}-${character.x}-${character.y}`);
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
    </div>
  );
};

export default Bush;
