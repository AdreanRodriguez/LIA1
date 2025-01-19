import "./bush.css";
import bush from "../../assets/bush.svg";

interface PositionProps {
  position: "left" | "right";
}

export default function Bush({ position }: PositionProps) {
  return (
    <figure className={`bush-container bush-${position}`}>
      <img className="bush" src={bush} alt="bush image" />
    </figure>
  );
}
