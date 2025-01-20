import "./cloud.css";
import cloud from "../../assets/cloud1.svg";

export default function Cloud() {
  // Gör den återanvändbar så att man kan ha ett mindre moln i bakgrunden
  return <img className="cloud" src={cloud} alt="cartoon cloud" />;
}
