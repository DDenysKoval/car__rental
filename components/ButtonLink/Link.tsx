import clsx from "clsx";
import css from "./Button.module.css";
import Link from "next/link";

interface LinkProps {
  text: string;
  width: number;
  link: string;
}

const LinkComp = ({ text, width, link }: LinkProps) => {
  const btnClassName = clsx(css.btn, width === 276 ? css.big : css.small);

  return (
    <Link href={link} className={btnClassName}>
      {text}
    </Link>
  );
};

export default LinkComp;
