import { SanityImageSource } from "@sanity/image-url/lib/types/types";
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
  const query = "*[_type == 'article']{'slug': slug.current}";
  const result = await client.fetch(query);
  return result.map((element) => element.slug);
};

export const getArticle = async (slug: string): Promise<IArticle> => {
  const query = `*[_type == 'article' && slug.current == '${slug}']{'title': languages.de.title, 'banner': languages.de.banner, author, 'content': languages.de.content}`;
  const result = (await client.fetch(query))[0];
  return {
    ...result,
    banner: {
      ...result.banner,
      url: urlFor(result.banner.asset).height(1000).url(),
      urlWithBlur: urlFor(result.banner.asset).blur(200).height(1000).url(),
    },
  };
};
