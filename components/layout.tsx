import Notification from "./notification";
import { INotification } from "../lib/notification";
import { NotificationDisplayCategory } from "../lib/enums/notificationDisplayCategory";
import Footer from "./footer";
import { IPartner } from "../lib/partner";

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
  notifcationList: INotification[];
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
}

const Layout = ({
  children,
  notifcationList,
  sponsorList,
  mediaPartnerList,
  additionalList,
}: LayoutProps): JSX.Element => {
  return (
    <div>
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
