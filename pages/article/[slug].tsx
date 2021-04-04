import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "node:querystring";
import { getArticle, getArticleSlugList, IArticle } from "../../lib/article";
import { getNewsLinkList, INewsLink } from "../../lib/news";
import Layout from "../../components/layout";
import NextLink from "next/link";
import React from "react";
import Label from "../../components/shared/label";
import Bubble from "../../components/shared/bubble";
import NextImage from "next/image";
import BlockContent from "@sanity/block-content-to-react";
import ImageGallery from "../../components/shared/imageGallery";
import InternalLink from "../../components/shared/internalLink";
import Youtube from "../../components/shared/youtube";

interface ArticleParams extends ParsedUrlQuery {
  slug: string;
}

interface ArticleProps extends IArticle {
  newsLinkList: INewsLink[];
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
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<ArticleParams>): Promise<
  GetStaticPropsResult<ArticleProps>
> => {
  const article = await getArticle(params.slug);
  return {
    props: {
      ...article,
      newsLinkList: await getNewsLinkList(),
    },
  };
};

const serializers = {
  types: {
    imageGallery: ImageGallery,
    youtube: Youtube,
  },
  marks: {
    internalLink: InternalLink,
  },
};

const Article = ({
  title,
  newsLinkList,
  banner,
  content,
  author,
}: ArticleProps): JSX.Element => {
  return (
    <Layout newsLinkList={newsLinkList}>
      <NextLink href="/">
        <a className="fixed top-10 sm:top-14 right-2 sm:right-5 z-10">
          <Bubble>
            <NextImage src="/close.svg" layout="fill" objectFit="contain" />
          </Bubble>
        </a>
      </NextLink>
      <div className="grid grid-cols-1 h-full sm:grid-cols-2 sm:space-x-5">
        <div className="relative sm:sticky sm:top-12 content-height">
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
            <Label>Foto</Label>
            <span>{banner.credits}</span>
          </div>
          <div className="flex flex-row space-x-4 mt-2 sm:mt-4 sm:text-3xl">
            <Label>Text</Label>
            <span>{author}</span>
          </div>
          <div className="mt-5 font-content">
            <BlockContent
              blocks={content}
              serializers={serializers}
              projectId={process.env.SANITY_PROJECT_ID}
              dataset={process.env.SANITY_DATASET}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
