import "./bus.css";
import CharacterBox from "../characterBox/CharacterBox";
import { CharacterType } from "../../types/characterType";
import busInside from "../../../public/assets/bus/busInside.png";
import busOutside from "../../../public/assets/bus/busOutside.webp";

interface BusProps {
  animation: boolean;
  characters: CharacterType[];
  onCharacterClick: (character: CharacterType) => void;
}

const Bus: React.FC<BusProps> = ({ characters, onCharacterClick, animation }) => {
  // Definiera positioner för karaktärslådorna
  const boxes = [
    {
      id: "window-1",
      position: { top: "34%", left: "11%" },
      size: { width: "6%", height: "20%" },
    },
    {
      id: "window-2",
      position: { top: "34%", left: "32%" },
      size: { width: "6%", height: "20%" },
    },
    {
      id: "window-3",
      position: { top: "34%", left: "43%" },
      size: { width: "6%", height: "20%" },
    },
    {
      id: "window-4",
      position: { top: "34%", left: "55%" },
      size: { width: "6%", height: "20%" },
    },
    {
      id: "window-5",
      position: { top: "34%", left: "70%" },
      size: { width: "6%", height: "20%" },
    },
    {
      id: "bus-left",
      position: { top: "47%", left: "-6%" },
      size: { width: "12%", height: "25%" },
    },
    {
      id: "bus-right",
      position: { top: "45%", left: "96%" },
      size: { width: "8%", height: "20%" },
    },
    {
      id: "under-bus",
      position: { top: "78%", left: "57%" },
      size: { width: "10%", height: "25%" },
    },
  ];

  return (
    <section className="bus-wrapper">
      <div className={`bus-container ${animation ? "bus-animation" : ""}`}>
        <img className="bus-inside" src={busInside} alt="Inside of a yellow school bus" />
        <img className="bus outside" src={busOutside} alt="Outside of a yellow school bus" />

        {boxes.map((box) => {
          const matchingCharacter = characters.find((char) => char.id === box.id);
          return (
            <CharacterBox
              key={box.id}
              size={box.size}
              position={box.position}
              character={matchingCharacter} // Koppla rätt karaktär
              isBusLeft={box.id === "bus-left"}
              onCharacterClick={onCharacterClick}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Bus;
