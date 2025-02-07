import "./portraitBlocker.css";

export default function PortraitBlocker() {
  return (
    <figure className="portraitBlocker__container">
      <img
        src="/assets/evilCharacters/evil.png"
        alt="Characters image"
        className="portrait-image__evil"
      />
      <img src="/assets/rotateDevice.svg" alt="Rotate device image" className="portrait-blocker" />
      <p className="collaboration">
        Illustratör:
        <a href="https://www.instagram.com/jimmieslice/" target="_blank">
          JimmieSlice
        </a>
      </p>
      <img
        src="/assets/goodCharacters/good.png"
        alt="Characters image"
        className="portrait-image__good"
      />
    </figure>
  );
}
