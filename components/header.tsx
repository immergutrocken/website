import { INewsLink } from "../lib/news";
import Link from "./shared/link";
import styles from "../styles/header.module.scss";
import Label from "./shared/label";
import Bubble from "./shared/bubble";
import NextImage from "next/image";
import Menu from "./menu";
import { useState } from "react";

const Header = ({ list }: { list: INewsLink[] }): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white">
      <div
        className={
          "flex flex-nowrap text-lg sm:text-4xl px-1 overflow-x-auto overflow-y-hidden whitespace-nowrap w-full " +
          styles.scrollbar
        }
      >
        <Label className="flex items-center">NEUES</Label>
        {list.map((news: INewsLink, index: number) => {
          return (
            <span className="pt-1" key={news.slug}>
              <Link href="" className="mx-2 sm:mx-4">
                {news.title}
              </Link>
              {index === list.length - 1 ? "" : "•"}
            </span>
          );
        })}
      </div>
      <Bubble
        className="absolute left-1 top-12 sm:left-2 sm:top-16"
        onClick={() => setShowMenu(true)}
      >
        <NextImage src="/burger-menu.svg" layout="fill" objectFit="contain" />
      </Bubble>
      <Menu showMenu={showMenu} onClose={() => setShowMenu(false)} />
    </header>
  );
};

export default Header;
