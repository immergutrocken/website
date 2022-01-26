import Notification from "./notification";
import { INotification } from "../lib/notification";
import { NotificationDisplayCategory } from "../lib/enums/notificationDisplayCategory";
import Footer from "./footer";
import { IPartner } from "../lib/partner";
import React, { useState } from "react";
import Menu from "./menu";
import Bubble from "./shared/bubble";
import NextImage from "next/image";
import { IMenuItem } from "../lib/menu";
import Button from "./shared/button";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import Link from "./shared/link";
import { INewsLink } from "../lib/news";

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
  notifcationList: INotification[];
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
  menuItems: IMenuItem[];
  newsList: INewsLink[];
}

const Layout = ({
  children,
  notifcationList,
  sponsorList,
  mediaPartnerList,
  additionalList,
  menuItems,
  newsList,
}: LayoutProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const t = useTranslations("Layout");

  return (
    <div>
      <div className="fixed top-0 z-10 flex w-full py-1 text-lg bg-white flex-nowrap sm:text-4xl font-important">
        <span className="flex items-center px-1 sm:px-2">{t("news")}:</span>
        <div
          className={
            "flex flex-nowrap overflow-x-auto overflow-y-hidden whitespace-nowrap w-full scrollbar"
          }
        >
          {newsList.map((news, index) => (
            <span key={index}>
              <NextLink href={`/article/${news.slug}`}>
                <a className="mx-2 sm:mx-4">{news.title}</a>
              </NextLink>
              {index === newsList.length - 1 ? "" : "•"}
            </span>
          ))}
        </div>
      </div>
      <Bubble
        className="fixed z-10 left-2 top-12 sm:left-4 sm:top-16"
        onClick={() => setShowMenu(true)}
      >
        <NextImage src="/burger-menu.svg" layout="fill" objectFit="contain" />
      </Bubble>
      <Menu
        showMenu={showMenu}
        onClose={() => setShowMenu(false)}
        items={menuItems}
      />
      <div className="fixed z-10 flex gap-2 right-2 top-12 sm:right-4 sm:top-16 sm:gap-4">
        <Link
          href="https://immergut.tickettoaster.de/tickets"
          className="hover:no-underline"
        >
          <Button className="!bg-grasshopper">{t("ticket-shop")}</Button>
        </Link>
        <NextLink
          href={router.asPath}
          locale={router.locale === "de" ? "en" : "de"}
        >
          <a>
            <Bubble className="text-xl sm:text-3xl font-important">
              {router.locale === "de" ? "en" : "de"}
            </Bubble>
          </a>
        </NextLink>
      </div>
      {children}
      <Footer
        sponsorList={sponsorList}
        mediaPartnerList={mediaPartnerList}
        additionalList={additionalList}
      />
      <div className="fixed bottom-0 z-20 w-full">
        {notifcationList
          ?.filter(
            (notification) =>
              notification.display === NotificationDisplayCategory.FOOTER
          )
          .map((notification, index) => (
            <Notification notification={notification} key={index} />
          ))}
      </div>
      {notifcationList
        ?.filter(
          (notification) =>
            notification.display === NotificationDisplayCategory.POP_UP
        )
        .map((notification, index) => (
          <Notification notification={notification} key={index}></Notification>
        ))}
    </div>
  );
};

export default Layout;
