import "./cloud.css";
import cloud from "../../assets/cloud1.svg";

interface cloudProps {
  top?: string;
  left?: string;
  width?: string;
  height?: string;
  animationDuration?: string;
}

export default function Cloud({
  top = "10",
  left = "",
  width = "10vw",
  height = "14vh",
  animationDuration = "10s",
}: cloudProps) {
  const styledCloud = {
    top,
    left,
    width,
    height,
    animationDuration,
  };
  // Gör den återanvändbar så att man kan ha ett mindre moln i bakgrunden
  return <img className="cloud" src={cloud} alt="cartoon cloud" style={styledCloud} />;
}
