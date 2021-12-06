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

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
  notifcationList: INotification[];
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
  menuItems: IMenuItem[];
}

const Layout = ({
  children,
  notifcationList,
  sponsorList,
  mediaPartnerList,
  additionalList,
  menuItems,
}: LayoutProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const t = useTranslations("Layout");

  return (
    <div>
      <Bubble
        className="fixed left-2 top-2 sm:left-4 sm:top-4 z-10"
        onClick={() => setShowMenu(true)}
      >
        <NextImage src="/burger-menu.svg" layout="fill" objectFit="contain" />
      </Bubble>
      <Menu
        showMenu={showMenu}
        onClose={() => setShowMenu(false)}
        items={menuItems}
      />
      <div className="fixed right-2 top-2 sm:right-4 sm:top-4 z-10 flex gap-2 sm:gap-4">
        <Link
          href="https://immergut.tickettoaster.de/tickets"
          className="hover:no-underline"
        >
          <Button className="bg-grasshopper">{t("ticket-shop")}</Button>
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
      <div className="fixed w-full bottom-0 z-20">
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
