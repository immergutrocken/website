import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/layout";
import { getArtist, getArtistList, IArtist } from "../../lib/artist";
import { getNewsLinkList, INewsLink } from "../../lib/news";
import NextImage from "next/image";
import Label from "../../components/shared/label";
import Bubble from "../../components/shared/bubble";
import Link from "../../components/shared/link";
import { SocialMedia } from "../../lib/enums/socialMedia.enum";
import NextLink from "next/link";
import styles from "../../styles/detail.module.scss";
import NextHead from "next/head";
import { getNotificationList, INotification } from "../../lib/notification";
import Content from "../../components/block-content/content";

interface ArtistParams extends ParsedUrlQuery {
  slug: string;
}

interface ArtistProps extends IArtist {
  newsLinkList: INewsLink[];
  notificationList: INotification[];
}

export const getStaticPaths = async (): Promise<
  GetStaticPathsResult<ArtistParams>
> => {
  const artistLinkList = await getArtistList();
  return {
    paths: artistLinkList.map((item) => ({
      params: {
        slug: item.slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<ArtistParams>): Promise<
  GetStaticPropsResult<ArtistProps>
> => {
  const artist = await getArtist(params.slug);
  return {
    props: {
      ...artist,
      newsLinkList: await getNewsLinkList(),
      notificationList: await getNotificationList(),
    },
    revalidate: 10,
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
  newsLinkList,
  banner,
  author,
  socialMedia,
  content,
  notificationList,
}: ArtistProps): JSX.Element => {
  return (
    <Layout newsLinkList={newsLinkList} notifcationList={notificationList}>
      <NextHead>
        <title>{`${title} - 21. Immergut Festival`}</title>
      </NextHead>
      <NextLink href="/">
        <a className="fixed top-10 sm:top-14 right-2 sm:right-5 z-10">
          <Bubble>
            <NextImage src="/close.svg" layout="fill" objectFit="contain" />
          </Bubble>
        </a>
      </NextLink>
      <div className="grid grid-cols-1 h-full sm:grid-cols-2 sm:space-x-5">
        <div className={`relative sm:sticky sm:top-12 ${styles.contentHeight}`}>
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
            <Label>Foto</Label>
            <span>{banner.credits}</span>
          </div>
          <div className="flex flex-row space-x-4 mt-2 sm:mt-4 sm:justify-center sm:text-3xl">
            <Label>Text</Label>
            <span>{author}</span>
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
