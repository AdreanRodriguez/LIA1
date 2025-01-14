import "./evilCharacter.css";
import evilCharacter from "../../../assets/EvilCharacter.svg";

export default function EvilCharacter() {
  return (
    <div
      className="character"
      // style={{
      //   left: `${x}%`,
      //   top: `${y}%`,
      //   transform: `translate(-50%, -100%) rotate($(angle)deg)`,
      // }}
    >
      <img className="evil-character" src={evilCharacter} alt="Angel cartoon character" />
    </div>
  );
}
