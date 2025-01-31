import "./button.css";

interface ButtonProps {
  name: string;
  className?: string;
  onClick: () => void;
}

export default function Button({ className, onClick, name }: ButtonProps) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {name}
    </button>
  );
}
