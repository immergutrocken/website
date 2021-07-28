import NewsLink from "next/link";
import styles from "../styles/layout.module.scss";
import { INewsLink } from "../lib/news";
import Notification from "./notification";
import { INotification } from "../lib/notification";
import { NotificationDisplayCategory } from "../lib/enums/notificationDisplayCategory";

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
  newsLinkList: INewsLink[];
  notifcationList: INotification[];
}

const buildDateAndLocation = (times: number): JSX.Element => {
  const tempArray = [];
  for (let index = 0; index < times; index++) {
    tempArray.push(index);
  }
  return (
    <>
      {tempArray.map((index) => (
        <span key={index}>26.-28.08.2021 • Neustrelitz • </span>
      ))}
    </>
  );
};

const Layout = ({
  children,
  newsLinkList,
  notifcationList,
}: LayoutProps): JSX.Element => (
  <div className="py-8 sm:py-12">
    <header className="fixed w-full top-0 z-10 bg-white flex flex-nowrap text-lg sm:text-4xl pt-1">
      <span className="flex items-center px-1 sm:px-2">NEUES:</span>
      <div
        className={
          "flex flex-nowrap overflow-x-auto overflow-y-hidden whitespace-nowrap w-full " +
          styles.scrollbar
        }
      >
        {newsLinkList.map((news: INewsLink, index: number) => {
          return (
            <span key={index}>
              <NewsLink href={`/article/${news.slug}`}>
                <a className="mx-2 sm:mx-4">{news.title}</a>
              </NewsLink>
              {index === newsLinkList.length - 1 ? "" : "•"}
            </span>
          );
        })}
      </div>
    </header>
    {children}
    <div className="fixed bottom-0 text-lg sm:text-4xl px-2 sm:px-0 sm:py-2 whitespace-nowrap overflow-x-hidden bg-white">
      <div className={styles.ticker}>{buildDateAndLocation(10)}</div>
    </div>
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

export default Layout;
