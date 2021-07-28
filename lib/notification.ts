import { NotificationDisplayCategory } from "./enums/notificationDisplayCategory";
import sanityClient from "./shared/sanityClient";

export interface INotification {
  title: string;
  content: [];
  display: NotificationDisplayCategory;
  startDate: Date;
  endDate: Date;
}

export const getNotificationList = async (): Promise<INotification[]> => {
  const query = `*[_type == "notification" && displayCategory == "footer"]{
    "title": languages.de.title,
    startDate,
    endDate,
    "display": displayCategory,
    "content": languages.de.content[]{..., asset->{..., "_key": _id}, markDefs[]{
      ...,
      _type == "internalLink" => {
        "docType": @.reference->_type,
        "slug": @.reference->slug.current
      },
    }}}`;
  return sanityClient.fetch(query);
};
