import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { getArticle, getArticleSlugList, IArticle } from "../../lib/article";
import Layout from "../../components/layout";
import Label from "../../components/shared/label";
import NextImage from "next/image";
import NextHead from "next/head";
import Content from "../../components/block-content/content";
import { getNotificationList, INotification } from "../../lib/notification";
import { useTranslations } from "next-intl";
import { getPartnerList, IPartner } from "../../lib/partner";
import PartnerCategory from "../../lib/enums/partnerCategory.enum";
import { getMenu, IMenuItem } from "../../lib/menu";

interface ArticleParams extends ParsedUrlQuery {
  slug: string;
}

interface ArticleProps extends IArticle {
  notificationList: INotification[];
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
  menuItems: IMenuItem[];
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
      menuItems: await getMenu(),
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
  menuItems,
}: ArticleProps): JSX.Element => {
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
      <div className="grid grid-cols-1 h-full sm:grid-cols-2 sm:space-x-5 sm:px-6 sm:pt-6">
        <div
          className={`relative sm:sticky sm:top-0 sm:max-h-screen sm:h-full flex items-center`}
        >
          <NextImage
            src={banner.url}
            width="1000"
            height="1000"
            alt={banner.alt}
            placeholder="blur"
            blurDataURL={banner.urlWithBlur}
          />
        </div>
        <div className="py-5 px-4">
          <h1 className="text-4xl sm:text-7xl font-important">{title}</h1>
          <div className="flex flex-row space-x-4 mt-5 sm:mt-8 sm:text-3xl">
            <Label>{t("photo").toString()}</Label>
            <span className="font-important">{banner.credits}</span>
          </div>
          {author && (
            <div className="flex flex-row space-x-4 mt-2 sm:mt-4 sm:text-3xl">
              <Label>{t("text").toString()}</Label>
              <span className="font-important">{author}</span>
            </div>
          )}
          <div className="mt-5 font-content">
            <Content content={content} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
