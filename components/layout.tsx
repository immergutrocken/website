import Notification from "./notification";
import { INotification } from "../lib/notification";
import { NotificationDisplayCategory } from "../lib/enums/notificationDisplayCategory";

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
  notifcationList: INotification[];
}

const Layout = ({ children, notifcationList }: LayoutProps): JSX.Element => {
  return (
    <div>
      {children}
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
