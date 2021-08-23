import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { getArticle, getArticleSlugList, IArticle } from "../../lib/article";
import { getNewsLinkList, INewsLink } from "../../lib/news";
import Layout from "../../components/layout";
import NextLink from "next/link";
import Label from "../../components/shared/label";
import Bubble from "../../components/shared/bubble";
import NextImage from "next/image";
import styles from "../../styles/detail.module.scss";
import NextHead from "next/head";
import Content from "../../components/block-content/content";
import { getNotificationList, INotification } from "../../lib/notification";
import { useTranslations } from "next-intl";

interface ArticleParams extends ParsedUrlQuery {
  slug: string;
}

interface ArticleProps extends IArticle {
  newsLinkList: INewsLink[];
  notificationList: INotification[];
  messages: unknown;
}

export const getStaticPaths = async (): Promise<
  GetStaticPathsResult<ArticleParams>
> => {
  const slugs = await getArticleSlugList();
  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
  locale,
}: GetStaticPropsContext<ArticleParams>): Promise<
  GetStaticPropsResult<ArticleProps>
> => {
  const article = await getArticle(params.slug, locale);
  return {
    props: {
      ...article,
      newsLinkList: await getNewsLinkList(locale),
      notificationList: await getNotificationList(locale),
      messages: require(`../../messages/${locale}.json`),
    },
    revalidate: 1,
  };
};

const Article = ({
  title,
  newsLinkList,
  banner,
  content,
  author,
  notificationList,
}: ArticleProps): JSX.Element => {
  const t = useTranslations("Article");

  return (
    <Layout newsLinkList={newsLinkList} notifcationList={notificationList}>
      <NextHead>
        <title>{`${title} - ${t("festival")}`}</title>
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
          <h1 className="text-4xl sm:text-7xl">{title}</h1>
          <div className="flex flex-row space-x-4 mt-5 sm:mt-8 sm:text-3xl">
            <Label>{t("photo").toString()}</Label>
            <span>{banner.credits}</span>
          </div>
          <div className="flex flex-row space-x-4 mt-2 sm:mt-4 sm:text-3xl">
            <Label>{t("text").toString()}</Label>
            <span>{author}</span>
          </div>
          <div className="mt-5 font-content">
            <Content content={content} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
