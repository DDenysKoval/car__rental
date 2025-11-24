import clsx from "clsx";
import css from "./Button.module.css";

interface ButtonProps {
  text: string;
  width: number;
  onSubmit: () => void;
}

const ButtonComp = ({ text, width, onSubmit }: ButtonProps) => {
  const btnClassName = clsx(css.btn, width === 276 ? css.big : css.small);

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <button className={btnClassName} type="submit" onSubmit={handleSubmit}>
      {text}
    </button>
  );
};

export default ButtonComp;
