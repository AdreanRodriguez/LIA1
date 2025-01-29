import "./portraitBlocker.css";
import rotateDevice from "../../assets/rotateDevice.svg";
import evilCharacter from "../../assets/evilCharacters/evil.png";
import goodCharacter from "../../assets/goodCharacters/good.png";

export default function PortraitBlocker() {
  return (
    <figure className="portraitBlocker__container">
      <img src={evilCharacter} alt="Characters image" className="portrait-image__evil" />
      <img src={rotateDevice} alt="Rotate device image" className="portrait-blocker" />
      <img src={goodCharacter} alt="Characters image" className="portrait-image__good" />
    </figure>
  );
}
