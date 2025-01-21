import "./bus.css";
import bus from "../../assets/bus/bussVt.svg";
import Character from "../character/Character";
import { CharacterType } from "../../types/characterType";

interface busProps {
  characters: CharacterType[];
  onCharacterClick: (character: CharacterType) => void;
}

export default function Bus({ characters, onCharacterClick }: busProps) {
  return (
    <div className="bus-container">
      <img className="bus" src={bus} alt="Yellow school bus" />
      {characters.map((character) => (
        <Character
          key={character.id}
          character={character}
          onClick={() => onCharacterClick(character)}
        />
      ))}
    </div>
  );
}
