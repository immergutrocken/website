import Bubble from "./shared/bubble";
import NextImage from "next/image";
import { IMenuItem } from "../lib/menu";
import { MenuItemType } from "../lib/enums/menuItemType.enum";
import Link from "./shared/link";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";

interface MenuProps {
  onClose: () => void;
  showMenu: boolean;
  items: IMenuItem[];
}

const buildMenuItem = (
  item: IMenuItem,
  onClose: () => void,
  locale: string
): JSX.Element => {
  switch (item.type) {
    case MenuItemType.EXTERNAL_LINK:
      return (
        <Link href={item.url} click={() => onClose()}>
          {locale === "de" ? item.title.de : item.title.en}
        </Link>
      );
    case MenuItemType.INTERNAL_LINK:
      return (
        <NextLink
          href={
            item.url != null ? item.url : `/${item.documentType}/${item.slug}`
          }
        >
          {/* eslint-disable-next-line */}
          <a onClick={() => onClose()}>
            {locale === "de" ? item.title.de : item.title.en}
          </a>
        </NextLink>
      );
    case MenuItemType.SUBMENU:
      return (
        <>
          <div>{locale === "de" ? item.title.de : item.title.en}</div>
          {item.submenuItems.map((subMenuItem, index) => (
            <div className="text-lg sm:text-3xl" key={index}>
              {buildMenuItem(subMenuItem, onClose, locale)}
            </div>
          ))}
        </>
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
  const router = useRouter();

  return (
    <div
      className={`w-full px-2 overflow-y-auto sm:w-auto sm:px-12 bg-white fixed z-20 left-0 h-full font-important ${displayClass}`}
    >
      <Bubble className="absolute top-3 right-3" onClick={() => onClose()}>
        <NextImage src="/close.svg" layout="fill" objectFit="contain" />
      </Bubble>
      <div className="mt-16 sm:mt-24">
        {items.map((item, index) => (
          <div className="text-center text-3xl sm:text-6xl" key={index}>
            {buildMenuItem(item, onClose, router.locale)}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <NextLink
          href={router.asPath}
          locale={router.locale === "de" ? "en" : "de"}
        >
          <a>
            <Bubble className="text-xl pt-2 sm:text-3xl sm:pt-3 font-important">
              {router.locale === "de" ? "en" : "de"}
            </Bubble>
          </a>
        </NextLink>
      </div>
    </div>
  );
};

export default Menu;
