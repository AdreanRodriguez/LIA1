import "./bush.css";
import bush from "../../assets/bush.svg";

interface PositionProps {
  left: string;
  bottom: string;
}

export default function Bush({ left, bottom }: PositionProps) {
  return (
    <figure className="bush-container" style={{ left: `${left}%`, bottom: `${bottom}%` }}>
      <img className="bush" src={bush} alt="bush image" />
    </figure>
  );
}
