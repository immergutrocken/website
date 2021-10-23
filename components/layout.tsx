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
