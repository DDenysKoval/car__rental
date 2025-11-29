import clsx from "clsx";
import css from "./Button.module.css";

interface ButtonProps {
  text: string;
  width: number;
  onClick?: () => void;
  type: "submit" | "button";
}

const ButtonComp = ({ text, width, onClick, type }: ButtonProps) => {
  const btnClassName = clsx(css.btn, width === 276 ? css.big : css.small);
  const whiteBtnClassName = clsx(
    css.whitebtn,
    width === 276 ? css.big : css.small
  );

  return (
    <button
      className={type === "button" ? whiteBtnClassName : btnClassName}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonComp;
