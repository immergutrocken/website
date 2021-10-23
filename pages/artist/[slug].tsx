import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/layout";
import { getArtist, getArtistList, IArtist } from "../../lib/artist";
import NextImage from "next/image";
import Label from "../../components/shared/label";
import Bubble from "../../components/shared/bubble";
import Link from "../../components/shared/link";
import { SocialMedia } from "../../lib/enums/socialMedia.enum";
import NextHead from "next/head";
import { getNotificationList, INotification } from "../../lib/notification";
import Content from "../../components/block-content/content";
import { useTranslations } from "next-intl";
import { getPartnerList, IPartner } from "../../lib/partner";
import PartnerCategory from "../../lib/enums/partnerCategory.enum";
import { getMenu, IMenuItem } from "../../lib/menu";

interface ArtistParams extends ParsedUrlQuery {
  slug: string;
}

interface ArtistProps extends IArtist {
  notificationList: INotification[];
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
  menuItems: IMenuItem[];
  messages: unknown;
}

export const getStaticPaths = async (): Promise<
  GetStaticPathsResult<ArtistParams>
> => {
  const artistLinkList = await getArtistList();
  return {
    paths: artistLinkList
      .map((item) => ({
        params: {
          slug: item.slug,
        },
        locale: "de",
      }))
      .concat(
        artistLinkList.map((item) => ({
          params: {
            slug: item.slug,
          },
          locale: "en",
        }))
      ),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
  locale,
}: GetStaticPropsContext<ArtistParams>): Promise<
  GetStaticPropsResult<ArtistProps>
> => {
  const artist = await getArtist(params.slug, locale);
  return {
    props: {
      ...artist,
      notificationList: await getNotificationList(locale),
      sponsorList: await getPartnerList(PartnerCategory.SPONSOR),
      mediaPartnerList: await getPartnerList(PartnerCategory.MEDIA_PARTNER),
      additionalList: await getPartnerList(PartnerCategory.ADDITIONAL),
      menuItems: await getMenu(),
      messages: require(`../../messages/${locale}.json`),
    },
    revalidate: 1,
  };
};

const imageMapping = new Map<SocialMedia, string>([
  [SocialMedia.WEBSITE, "/website-logo.svg"],
  [SocialMedia.YOUTUBE, "/youtube-logo.svg"],
  [SocialMedia.FACEBOOK, "/facebook-logo.svg"],
  [SocialMedia.TWITTER, "/twitter-logo.svg"],
  [SocialMedia.INSTAGRAM, "/instagram-logo.svg"],
  [SocialMedia.VIMEO, "/vimeo-logo.svg"],
  [SocialMedia.TIKTOK, "/tiktok-logo.svg"],
  [SocialMedia.SPOTIFY, "/spotify-logo.svg"],
  [SocialMedia.LABEL, "/label-logo.svg"],
]);

const Artist = ({
  title,
  banner,
  author,
  socialMedia,
  content,
  notificationList,
  sponsorList,
  mediaPartnerList,
  additionalList,
  menuItems,
}: ArtistProps): JSX.Element => {
  const t = useTranslations("Article");

  return (
    <Layout
      notifcationList={notificationList}
      sponsorList={sponsorList}
      mediaPartnerList={mediaPartnerList}
      additionalList={additionalList}
      menuItems={menuItems}
    >
      <NextHead>
        <title>{`${title} - ${t("festival")}`}</title>
      </NextHead>
      <div className="grid grid-cols-1 h-full sm:grid-cols-2 sm:space-x-5">
        <div
          className={`relative sm:sticky sm:top-0 h-72 sm:max-h-screen sm:h-full`}
        >
          <NextImage
            src={banner.urlWithBlur}
            layout="fill"
            objectFit="cover"
            alt={banner.alt}
          />
          <NextImage
            src={banner.url}
            layout="fill"
            objectFit="contain"
            alt={banner.alt}
          />
        </div>
        <div className="py-5 px-4">
          <h1 className="text-4xl sm:text-7xl sm:text-center">{title}</h1>
          <div className="flex flex-row space-x-4 mt-5 sm:mt-8 sm:justify-center sm:text-3xl">
            <Label>{t("photo").toString()}</Label>
            <span className="font-important">{banner.credits}</span>
          </div>
          <div className="flex flex-row space-x-4 mt-2 sm:mt-4 sm:justify-center sm:text-3xl">
            <Label>{t("text").toString()}</Label>
            <span className="font-important">{author}</span>
          </div>
          <div className="flex flex-row flex-wrap mt-3 sm:mt-6 sm:justify-center">
            {socialMedia.map((element, index) => (
              <Link
                href={element.url}
                key={index}
                className="mr-2 mb-3 sm:mr-3 sm:mb-2"
              >
                <Bubble>
                  <NextImage
                    src={imageMapping.get(element.type)}
                    layout="fill"
                    objectFit="contain"
                  />
                </Bubble>
              </Link>
            ))}
          </div>
          <div className="mt-5 font-content sm:text-center">
            <Content content={content} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Artist;
