"use client";

import Link from "next/link";
import css from "./Footer.module.css";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className={pathname === "/" ? css.footer : css.footerNormal}>
      <div className={`container ${css.content}`}>
        <p>© {new Date().getFullYear()} RentalCar.</p>
        <p>
          Contact:
          <Link href="mailto:denyskoval.dev@gmail.com">
            denyskoval.dev@gmail.com
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
