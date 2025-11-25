import clsx from "clsx";
import css from "./Button.module.css";

interface ButtonProps {
  text: string;
  width: number;
  onClick: () => void;
  type: "submit" | "button";
}

const ButtonComp = ({ text, width, onClick, type }: ButtonProps) => {
  const btnClassName = clsx(css.btn, width === 276 ? css.big : css.small);
  const whiteBtnClassName = clsx(
    css.whitebtn,
    width === 276 ? css.big : css.small
  );

  const handleSubmit = () => {
    onClick();
  };

  return (
    <button
      className={type === "button" ? whiteBtnClassName : btnClassName}
      type={type}
      onSubmit={handleSubmit}
    >
      {text}
    </button>
  );
};

export default ButtonComp;
