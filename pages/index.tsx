import NextHead from "next/head";
import NextImage from "next/image";
import Footer from "../components/footer";
import { getNewsLinkList, INewsLink } from "../lib/news";
import { getPartnerList, IPartner } from "../lib/partner";
import PartnerCategory from "../lib/enums/partnerCategory.enum";
import { getMenu, IMenuItem } from "../lib/menu";
import { getArtistLinkList, IArtistLink } from "../lib/artist";
import NextLink from "next/link";
// import Button from "../components/shared/button";
import { useState } from "react";
// import { ArtistCategory } from "../lib/enums/artistCategory.enum";
import Bubble from "../components/shared/bubble";
import Menu from "../components/menu";
import Layout from "../components/layout";
import { getNotificationList, INotification } from "../lib/notification";
import { useRouter } from "next/dist/client/router";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { useTranslations } from "next-intl";
import Label from "../components/shared/label";

interface HomeProps {
  newsLinkList: INewsLink[];
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
  menuItems: IMenuItem[];
  artistLinkList: IArtistLink[];
  notificationList: INotification[];
  messages: unknown;
}

export const getStaticProps = async ({
  locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<HomeProps>> => {
  return {
    props: {
      newsLinkList: await getNewsLinkList(locale),
      sponsorList: await getPartnerList(PartnerCategory.SPONSOR),
      mediaPartnerList: await getPartnerList(PartnerCategory.MEDIA_PARTNER),
      additionalList: await getPartnerList(PartnerCategory.ADDITIONAL),
      menuItems: await getMenu(),
      artistLinkList: await getArtistLinkList(locale),
      notificationList: await getNotificationList(locale),
      messages: require(`../messages/${locale}.json`),
    },
    revalidate: 1,
  };
};

export default function Home(props: HomeProps): JSX.Element {
  // const [filterCategory, setFilterCategory] = useState<ArtistCategory>(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const t = useTranslations("Home");

  return (
    <Layout notifcationList={props.notificationList}>
      <NextHead>
        <title>{t("festival")}</title>
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
      <Bubble
        className="fixed left-1 top-9 sm:left-2 sm:top-14 z-10"
        onClick={() => setShowMenu(true)}
      >
        <NextImage src="/burger-menu.svg" layout="fill" objectFit="contain" />
      </Bubble>
      <Menu
        showMenu={showMenu}
        onClose={() => setShowMenu(false)}
        items={props.menuItems}
      />
      <NextLink href="/" locale={router.locale === "de" ? "en" : "de"}>
        <a>
          <Bubble className="fixed right-1 top-9 sm:right-2 sm:top-14 z-10 text-xl pt-3 pl-1.5 sm:text-3xl sm:pt-4 sm:pl-2.5">
            {router.locale === "de" ? "en" : "de"}
          </Bubble>
        </a>
      </NextLink>
      <div className="block sm:hidden">
        <NextImage
          src="/images/ig-website-mobile-cd.png"
          width="1080"
          height="1534"
          layout="responsive"
        />
      </div>
      <div className="hidden sm:block">
        <NextImage
          src="/images/ig-website-desktop-cd.png"
          width="3280"
          height="1336"
          layout="responsive"
        />
      </div>
      {/* <div className="mt-4 sm:mt-6 text-center">
        <Button
          className="mx-2"
          onClick={() =>
            setFilterCategory(
              filterCategory === ArtistCategory.MUSIC
                ? null
                : ArtistCategory.MUSIC
            )
          }
          active={
            filterCategory === ArtistCategory.MUSIC || filterCategory === null
          }
          size="small"
        >
          {t("music").toString()}
        </Button>
        <Button
          className="mx-2"
          onClick={() =>
            setFilterCategory(
              filterCategory === ArtistCategory.READING
                ? null
                : ArtistCategory.READING
            )
          }
          active={
            filterCategory === ArtistCategory.READING || filterCategory === null
          }
          size="small"
        >
          {t("readings").toString()}
        </Button>
      </div> */}
      <div className="mt-4 sm:mt-6 text-3xl text-center">
        <Label>{t("news")}</Label>
      </div>
      <div className="mt-4 sm:mt-6 text-4xl sm:text-6xl text-center flex flex-row flex-wrap justify-center">
        {props.newsLinkList.map((news: INewsLink, index: number) => {
          return (
            <span key={index}>
              <NextLink href={`/article/${news.slug}`}>
                <a className="mx-2 sm:mx-4">{news.title}</a>
              </NextLink>
              {index === props.newsLinkList.length - 1 ? "" : "•"}
            </span>
          );
        })}
        {/* {props.artistLinkList
          .filter((link) =>
            filterCategory === null ? true : link.category === filterCategory
          )
          .map((link, index, array) => (
            <span key={index}>
              <NextLink href={`/artist/${link.slug}`}>
                <a className="sm:mx-5">{link.title}</a>
              </NextLink>
              {index === array.length - 1 ? "" : "•"}
            </span>
          ))} */}
      </div>
      <Footer
        sponsorList={props.sponsorList}
        mediaPartnerList={props.mediaPartnerList}
        additionalList={props.additionalList}
      />
    </Layout>
  );
}
