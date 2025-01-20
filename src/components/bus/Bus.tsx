import "./bus.css";
import bus from "../../assets/bus/bussVt.svg";

interface busProps {
  children?: React.ReactNode;
}

export default function Bus({ children }: busProps) {
  return (
    <div className="bus-container">
      <img className="bus" src={bus} alt="" />
      {children}
    </div>
  );
}
