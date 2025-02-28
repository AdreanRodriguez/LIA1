import "./bus.css";
import { useEffect, useRef, useMemo } from "react";
import CharacterBox from "../characterBox/CharacterBox";
import { CharacterType } from "../../types/characterType";

interface BusProps {
  isGameStarted: boolean;
  characters: CharacterType[];
  handleCharacterRemoval: (uuid: string) => void;
  handleCharacterClick: (character: CharacterType) => void;
}

const Bus: React.FC<BusProps> = ({
  characters,
  isGameStarted,
  handleCharacterClick,
  handleCharacterRemoval,
}) => {
  const hasBusArrived = useRef(false);

  useEffect(() => {
    if (isGameStarted && !hasBusArrived.current) {
      const busTimeout = setTimeout(() => {
        hasBusArrived.current = true;
      }, 50);

      return () => {
        clearTimeout(busTimeout);
      };
    }
  }, [isGameStarted]);

  const boxes = useMemo(
    () => [
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
    ],
    []
  );

  const matchingCharacters = useMemo(() => {
    return boxes.map((box) => ({
      ...box,
      character: characters.find((char) => char.positionId === box.positionId),
    }));
  }, [characters, boxes]);

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

        {matchingCharacters.map(({ positionId, position, size, character }) => (
          <CharacterBox
            size={size}
            position={position}
            character={character}
            handleCharacterClick={handleCharacterClick}
            key={character ? character.uuid : positionId}
            handleCharacterRemoval={handleCharacterRemoval}
          />
        ))}
      </div>
    </section>
  );
};

export default Bus;
