import "./bus.css";
import { useEffect, useRef } from "react";
import CharacterBox from "../characterBox/CharacterBox";
import { CharacterType } from "../../types/characterType";

interface BusProps {
  isGameStarted: boolean;
  characters: CharacterType[];
  onAnimationEnd: (uuid: string) => void;
  onCharacterClick: (character: CharacterType) => void;
}

interface Box {
  id: string;
  position: { top: string; left: string };
  size: { width: string; height: string };
}

const Bus: React.FC<BusProps> = ({
  characters,
  isGameStarted,
  onAnimationEnd,
  onCharacterClick,
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
      positionId: "window-1",
      position: { top: "34%", left: "11%" },
      size: { width: "8%", height: "20%" },
    },
    {
      positionId: "window-2",
      position: { top: "34%", left: "28%" },
      size: { width: "11%", height: "20%" },
    },
    {
      positionId: "window-3",
      position: { top: "34%", left: "41%" },
      size: { width: "11%", height: "20%" },
    },
    {
      positionId: "window-4",
      position: { top: "34%", left: "53%" },
      size: { width: "11%", height: "20%" },
    },
    {
      positionId: "window-5",
      position: { top: "34%", left: "68%" },
      size: { width: "11%", height: "20%" },
    },
    {
      positionId: "bus-left",
      position: { top: "44%", left: "-7%" },
      size: { width: "12%", height: "25%" },
    },
    {
      positionId: "bus-right",
      position: { top: "50%", left: "95%" },
      size: { width: "12%", height: "25%" },
    },
    {
      positionId: "under-bus",
      position: { top: "79%", left: "52%" },
      size: { width: "17%", height: "20%" },
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
          const matchingCharacter = characters.find(
            (char) => char.positionId === box.positionId && char.uuid
          );
          return (
            <CharacterBox
              key={matchingCharacter ? matchingCharacter.uuid : box.positionId}
              size={box.size}
              position={box.position}
              character={matchingCharacter}
              isBusLeft={box.positionId === "bus-left"}
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
