import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { getArticle, getArticleSlugList, IArticle } from "../../lib/article";
import Layout from "../../components/layout";
import NextLink from "next/link";
import Label from "../../components/shared/label";
import Bubble from "../../components/shared/bubble";
import NextImage from "next/image";
import NextHead from "next/head";
import Content from "../../components/block-content/content";
import { getNotificationList, INotification } from "../../lib/notification";
import { useTranslations } from "next-intl";
import { getPartnerList, IPartner } from "../../lib/partner";
import PartnerCategory from "../../lib/enums/partnerCategory.enum";

interface ArticleParams extends ParsedUrlQuery {
  slug: string;
}

interface ArticleProps extends IArticle {
  notificationList: INotification[];
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
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
      notificationList: await getNotificationList(locale),
      sponsorList: await getPartnerList(PartnerCategory.SPONSOR),
      mediaPartnerList: await getPartnerList(PartnerCategory.MEDIA_PARTNER),
      additionalList: await getPartnerList(PartnerCategory.ADDITIONAL),
      messages: require(`../../messages/${locale}.json`),
    },
    revalidate: 1,
  };
};

const Article = ({
  title,
  banner,
  content,
  author,
  notificationList,
  sponsorList,
  mediaPartnerList,
  additionalList,
}: ArticleProps): JSX.Element => {
  const t = useTranslations("Article");

  return (
    <Layout
      notifcationList={notificationList}
      sponsorList={sponsorList}
      mediaPartnerList={mediaPartnerList}
      additionalList={additionalList}
    >
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
        <div className={`relative sm:sticky sm:top-12 h-72 sm:h-full`}>
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
          <h1 className="text-4xl sm:text-7xl font-important">{title}</h1>
          <div className="flex flex-row space-x-4 mt-5 sm:mt-8 sm:text-3xl">
            <Label>{t("photo").toString()}</Label>
            <span className="font-important">{banner.credits}</span>
          </div>
          <div className="flex flex-row space-x-4 mt-2 sm:mt-4 sm:text-3xl">
            <Label>{t("text").toString()}</Label>
            <span className="font-important">{author}</span>
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
