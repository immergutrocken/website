import NextHead from "next/head";
import NextImage from "next/image";
import { getNewsLinkList, INewsLink } from "../lib/news";
import { getPartnerList, IPartner } from "../lib/partner";
import PartnerCategory from "../lib/enums/partnerCategory.enum";
import { getMenu, IMenuItem } from "../lib/menu";
import { getArtistLinkList, IArtistLink } from "../lib/artist";
import NextLink from "next/link";
// import Button from "../components/shared/button";
// import { ArtistCategory } from "../lib/enums/artistCategory.enum";
import Bubble from "../components/shared/bubble";
import Layout from "../components/layout";
import { getNotificationList, INotification } from "../lib/notification";
import { useRouter } from "next/dist/client/router";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { useTranslations } from "next-intl";
import Label from "../components/shared/label";
import bannerMobile from "../public/images/ig-website-mobile-cd.png";
import bannerDesktop from "../public/images/ig-website-desktop-cd.png";

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
  const router = useRouter();
  const t = useTranslations("Home");

  return (
    <Layout
      notifcationList={props.notificationList}
      sponsorList={props.sponsorList}
      mediaPartnerList={props.mediaPartnerList}
      additionalList={props.additionalList}
      menuItems={props.menuItems}
    >
      <NextHead>
        <title>{t("festival")}</title>
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
      <NextLink href="/" locale={router.locale === "de" ? "en" : "de"}>
        <a>
          <Bubble className="fixed right-2 top-2 sm:right-4 sm:top-4 z-10 text-xl sm:text-3xl font-important">
            {router.locale === "de" ? "en" : "de"}
          </Bubble>
        </a>
      </NextLink>
      <div className="block sm:hidden">
        <NextImage
          src={bannerMobile}
          width="1080"
          height="1534"
          layout="responsive"
          placeholder="blur"
        />
      </div>
      <div className="hidden sm:block">
        <NextImage
          src={bannerDesktop}
          width="3280"
          height="1336"
          layout="responsive"
          placeholder="blur"
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
      <div className="mt-4 sm:mt-6 text-3xl sm:text-5xl text-center flex flex-row flex-wrap justify-center font-important">
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
    </Layout>
  );
}
