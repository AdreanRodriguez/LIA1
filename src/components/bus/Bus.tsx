import "./bus.css";
import { useEffect, useRef } from "react";
import CharacterBox from "../characterBox/CharacterBox";
import { CharacterType } from "../../types/characterType";

interface BusProps {
  isGameStarted: boolean;
  characters: CharacterType[];
  onCharacterClick: (character: CharacterType) => void;
  onAnimationEnd: (uuid: string) => void;
}

const Bus: React.FC<BusProps> = ({
  characters,
  onCharacterClick,
  isGameStarted,
  onAnimationEnd,
}) => {
  const hasBusArrived = useRef(false);

  useEffect(() => {
    // Kör animationen ENBART när spelet startas första gången
    if (isGameStarted && !hasBusArrived.current) {
      hasBusArrived.current = true; // Markera att bussen har anlänt
    }
  }, [isGameStarted]);

  const boxes = [
    {
      id: "window-1",
      position: { top: "34%", left: "11%" },
      size: { width: "8%", height: "20%" },
    },
    {
      id: "window-2",
      position: { top: "34%", left: "28%" },
      size: { width: "11%", height: "20%" },
    },
    {
      id: "window-3",
      position: { top: "34%", left: "41%" },
      size: { width: "11%", height: "20%" },
    },
    {
      id: "window-4",
      position: { top: "34%", left: "53%" },
      size: { width: "11%", height: "20%" },
    },
    {
      id: "window-5",
      position: { top: "34%", left: "68%" },
      size: { width: "11%", height: "20%" },
    },
    {
      id: "bus-left",
      position: { top: "44%", left: "-7%" },
      size: { width: "12%", height: "25%" },
    },
    {
      id: "bus-right",
      position: { top: "50%", left: "95%" },
      size: { width: "12%", height: "25%" },
    },
    {
      id: "under-bus",
      position: { top: "78%", left: "54%" },
      size: { width: "13%", height: "25%" },
    },
  ];

  return (
    <section className="bus-wrapper">
      <div
        className={`bus-container ${
          isGameStarted && !hasBusArrived.current ? "bus-animation" : ""
        }`}
      >
        <img
          className="bus-inside"
          src="/assets/bus/busInside.png"
          alt="Inside of a yellow school bus"
        />
        <img
          className="bus outside"
          src="/assets/bus/busOutside.png"
          alt="Outside of a yellow school bus"
        />

        {boxes.map((box) => {
          const matchingCharacter = characters.find((char) => char.id === box.id && char.uuid);
          return (
            <CharacterBox
              key={matchingCharacter ? matchingCharacter.uuid : box.id}
              size={box.size}
              position={box.position}
              character={matchingCharacter}
              isBusLeft={box.id === "bus-left"}
              onCharacterClick={onCharacterClick}
              onAnimationEnd={onAnimationEnd}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Bus;
