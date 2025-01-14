import "./goodCharacter.css";
import goodCharacter from "../../../assets/goodCharacter.svg";

export default function GoodCharacter() {
  return (
    <div
      className="character"
      // style={{
      //   left: `${x}%`,
      //   top: `${y}%`,
      //   transform: `translate(-50%, -100%) rotate($(angle)deg)`,
      // }}
    >
      <img className="good-character" src={goodCharacter} alt="Angel cartoon character" />;
    </div>
  );
}
