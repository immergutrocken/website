import Bubble from "./shared/bubble";
import NextImage from "next/image";
import { IMenuItem } from "../lib/menu";
import { MenuItemType } from "../lib/enums/menuItemType.enum";
import Link from "./shared/link";
import NextLink from "next/link";
import Expander from "./shared/expander";
import styles from "../styles/menu.module.scss";

interface MenuProps {
  onClose: () => void;
  showMenu: boolean;
  items: IMenuItem[];
}

const buildMenuItem = (item: IMenuItem): JSX.Element => {
  switch (item.type) {
    case MenuItemType.EXTERNAL_LINK:
      return <Link href={item.url}>{item.title.de}</Link>;
    case MenuItemType.INTERNAL_LINK:
      return (
        <NextLink
          href={
            item.url != null ? item.url : `/${item.documentType}/${item.slug}`
          }
        >
          <a>{item.title.de}</a>
        </NextLink>
      );
    case MenuItemType.SUBMENU:
      return (
        <Expander title={item.title.de}>
          {item.submenuItems.map((subMenuItem, index) => (
            <div className={`text-white ${styles.textStroke}`} key={index}>
              {buildMenuItem(subMenuItem)}
            </div>
          ))}
        </Expander>
      );
    default:
      throw new Error(`No menu item implemented for type ${item.type}`);
  }
};

const Menu = ({
  onClose,
  showMenu = false,
  items = [],
}: MenuProps): JSX.Element => {
  const displayClass = showMenu ? "block" : "hidden";
  return (
    <div
      className={`w-full px-2 overflow-y-auto sm:w-1/2 bg-white fixed z-20 top-8 sm:top-11 left-0 ${styles.contentHeight} ${displayClass}`}
    >
      <Bubble className="absolute top-3 right-3" onClick={() => onClose()}>
        <NextImage src="/close.svg" layout="fill" objectFit="contain" />
      </Bubble>
      <div className="mt-16 sm:mt-24">
        {items.map((item, index) => (
          <div className="text-center text-3xl sm:text-6xl" key={index}>
            {buildMenuItem(item)}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Bubble
          className="text-xl pt-3 sm:text-3xl sm:pt-4"
          onClick={() => console.log("set to english")}
        >
          en
        </Bubble>
      </div>
    </div>
  );
};

export default Menu;
