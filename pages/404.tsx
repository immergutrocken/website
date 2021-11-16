import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { useTranslations } from "use-intl";
import Layout from "../components/layout";
import PartnerCategory from "../lib/enums/partnerCategory.enum";
import { getMenu, IMenuItem } from "../lib/menu";
import { getNotificationList, INotification } from "../lib/notification";
import { getPartnerList, IPartner } from "../lib/partner";
import NextHead from "next/head";
import NextLink from "next/link";

interface Custom404Props {
  notificationList: INotification[];
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
  menuItems: IMenuItem[];
  messages: unknown;
}

export const getStaticProps = async ({
  locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<Custom404Props>> => {
  return {
    props: {
      notificationList: await getNotificationList(locale),
      sponsorList: await getPartnerList(PartnerCategory.SPONSOR),
      mediaPartnerList: await getPartnerList(PartnerCategory.MEDIA_PARTNER),
      additionalList: await getPartnerList(PartnerCategory.ADDITIONAL),
      menuItems: await getMenu(),
      messages: require(`../messages/${locale}.json`),
    },
    revalidate: 1,
  };
};

const Custom404 = ({
  notificationList,
  sponsorList,
  mediaPartnerList,
  additionalList,
  menuItems,
}) => {
  const t = useTranslations("404");

  return (
    <Layout
      notifcationList={notificationList}
      sponsorList={sponsorList}
      mediaPartnerList={mediaPartnerList}
      additionalList={additionalList}
      menuItems={menuItems}
    >
      <NextHead>
        <title>{t("festival")}</title>
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
      <div className="h-1/2 px-7 mt-20 text-center">
        <h1 className="text-3xl">{t("title")}</h1>
        <p>
          {t("text-part-1")}
          <br />
          {t("text-part-2")}
          <NextLink href="/">
            <a>{t("link-text")}</a>
          </NextLink>{" "}
          {t("text-part-3")}
        </p>
      </div>
    </Layout>
  );
};

export default Custom404;
