"use client";

import Link from "next/link";
import css from "./Header.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <nav className={`container ${css.navwrapper}`}>
        <Link href="/">
          <svg width={104} height={16}>
            <use href="/Logo.svg"></use>
          </svg>
        </Link>
        <ul className={css.navlist}>
          <li className={clsx(css.navlistitem, pathname === "/" && css.active)}>
            <Link href="/">Home</Link>
          </li>
          <li
            className={clsx(
              css.navlistitem,
              pathname === "/catalog" && css.active
            )}
          >
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
