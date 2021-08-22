import NextHead from "next/head";
import NextImage from "next/image";
import Footer from "../components/footer";
import { getNewsLinkList, INewsLink } from "../lib/news";
import { getPartnerList, IPartner } from "../lib/partner";
import PartnerCategory from "../lib/enums/partnerCategory.enum";
import { getMenu, IMenuItem } from "../lib/menu";
import { getArtistLinkList, IArtistLink } from "../lib/artist";
import NextLink from "next/link";
import Button from "../components/shared/button";
import { useState } from "react";
import { ArtistCategory } from "../lib/enums/artistCategory.enum";
import Bubble from "../components/shared/bubble";
import Menu from "../components/menu";
import Layout from "../components/layout";
import styles from "../styles/Home.module.scss";
import { getNotificationList, INotification } from "../lib/notification";
import useWindowScroll from "@react-hook/window-scroll";
import { useRouter } from "next/dist/client/router";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";

interface HomeProps {
  newsLinkList: INewsLink[];
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
  menuItems: IMenuItem[];
  artistLinkList: IArtistLink[];
  notificationList: INotification[];
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
    },
    revalidate: 10,
  };
};

export default function Home(props: HomeProps): JSX.Element {
  const [filterCategory, setFilterCategory] = useState<ArtistCategory>(null);
  const [showMenu, setShowMenu] = useState(false);
  const scroll = useWindowScroll(60);
  const router = useRouter();

  return (
    <Layout
      newsLinkList={props.newsLinkList}
      notifcationList={props.notificationList}
    >
      <NextHead>
        <title>21. Immergut Festival</title>
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
          src="/images/ig-website-mobile-illu.jpg"
          width="320"
          height="455"
          layout="responsive"
        />
      </div>
      <div className="hidden sm:block">
        <NextImage
          src="/images/ig-website-desktop-illu2.jpg"
          width="1440"
          height="587"
          layout="responsive"
        />
      </div>
      <div
        className={`absolute ${styles.logo}`}
        style={{ transform: `rotate(${scroll}deg)` }}
      >
        <NextImage src="/images/ig-motto-logo1.svg" layout="fill" />
      </div>
      <div className="mt-4 sm:mt-6 text-center">
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
          Musik
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
          Lesung
        </Button>
      </div>
      <div className="mt-4 sm:mt-6 text-4xl sm:text-6xl text-center flex flex-row flex-wrap justify-center">
        {props.artistLinkList
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
          ))}
      </div>
      <Footer
        sponsorList={props.sponsorList}
        mediaPartnerList={props.mediaPartnerList}
        additionalList={props.additionalList}
      />
    </Layout>
  );
}
