import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import groq from "groq";
import client from "./shared/sanityClient";
import { urlFor } from "./shared/sanityImageUrl";

export interface IArticle {
  title: string;
  banner: {
    alt: string;
    asset: SanityImageSource;
    credits: string;
    url: string;
    urlWithBlur: string;
  };
  author: string;
  content: [];
}

export const getArticleSlugList = async (): Promise<string[]> => {
  const query = groq`*[_type == 'article']{'slug': slug.current}`;
  const result = await client.fetch(query);
  return result.map((element) => element.slug);
};

export const getArticle = async (
  slug: string,
  locale: string
): Promise<IArticle> => {
  const query = groq`
  *
  [_type == "article" && slug.current == "${slug}"]
  {
    "titleDe": languages.de.title,
    "titleEn": languages.en.title,
    "banner": languages.de.banner,
    author,
    "contentDe": languages.de.content[]{..., asset->{..., "_key": _id}, markDefs[]{
      ...,
      _type == "internalLink" => {
        "docType": @.reference->_type,
        "slug": @.reference->slug.current
      },
    }},
    "contentEn": languages.en.content[]{..., asset->{..., "_key": _id}, markDefs[]{
      ...,
      _type == "internalLink" => {
        "docType": @.reference->_type,
        "slug": @.reference->slug.current
      },
    },
    }}`;

  const result = (await client.fetch(query))[0];
  console.log(result);

  const article = {
    ...result,
    title: locale === "en" && result.titleEn ? result.titleEn : result.titleDe,
    banner: {
      ...result.banner,
      url: urlFor(result.banner.asset).height(1000).url(),
      urlWithBlur: urlFor(result.banner.asset).blur(200).height(1000).url(),
    },
    content:
      locale === "en" && result.contentEn ? result.contentEn : result.contentDe,
  };

  article.content.forEach((element) => {
    if (element._type === "imageGallery") {
      element.images.forEach((image) => {
        image.urlPreview = urlFor(image.asset).height(400).url();
        image.url = urlFor(image.asset).height(1000).url();
      });
    }
  });

  return article;
};
