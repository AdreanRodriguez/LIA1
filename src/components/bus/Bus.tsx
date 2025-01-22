import "./bus.css";
import bus from "../../assets/bus/bussVt.svg";
import CharacterBox from "../characterBox/CharacterBox";
import { CharacterType } from "../../types/characterType";

interface BusProps {
  characters: CharacterType[];
  onCharacterClick: (character: CharacterType) => void;
}

const Bus: React.FC<BusProps> = ({ characters, onCharacterClick }) => {
  // Definiera positioner för karaktärslådorna
  const boxes = [
    {
      id: "window-1",
      position: { top: "32%", left: "11%" },
      size: { width: "6%", height: "17%" },
    },
    {
      id: "window-2",
      position: { top: "32%", left: "30%" },
      size: { width: "6%", height: "17%" },
    },
    {
      id: "window-3",
      position: { top: "32%", left: "43%" },
      size: { width: "6%", height: "17%" },
    },
    {
      id: "window-4",
      position: { top: "32%", left: "55%" },
      size: { width: "6%", height: "17%" },
    },
    {
      id: "window-5",
      position: { top: "32%", left: "70%" },
      size: { width: "6%", height: "17%" },
    },
    // {
    //   id: "bush-left",
    //   position: { top: "64%", left: "10%" },
    //   size: { width: "60%", height: "70%" },
    // },
    // {
    //   id: "bush-right",
    //   position: { top: "64%", left: "77%" },
    //   size: { width: "65%", height: "75%" },
    // },
    {
      id: "bus-left",
      position: { top: "40%", left: "-6%" },
      size: { width: "12%", height: "25%" },
    },
    {
      id: "bus-right",
      position: { top: "45%", left: "96%" },
      size: { width: "10%", height: "30%" },
    },
  ];

  return (
    <div className="bus-container">
      {/* Bussbild */}
      <img className="bus" src={bus} alt="Yellow school bus" />

      {/* Rendera CharacterBox för varje position */}
      {boxes.map((box) => {
        const matchingCharacter = characters.find((char) => char.id === box.id);
        return (
          <CharacterBox
            key={box.id}
            size={box.size}
            position={box.position}
            character={matchingCharacter} // Koppla rätt karaktär
            onCharacterClick={onCharacterClick}
          />
        );
      })}
    </div>
  );
};

export default Bus;
