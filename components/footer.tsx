import { IPartner } from "../lib/partner";
import Bubble from "./shared/bubble";
import Link from "./shared/link";
import Partner from "./partner";
import NextImage from "next/image";
import socialMedia from "../lib/models/socialMedia";
import NewsletterRegistration from "./newsletterRegistration";
import { useTranslations } from "next-intl";

interface FooterProps {
  sponsorList: IPartner[];
  mediaPartnerList: IPartner[];
  additionalList: IPartner[];
}

const Footer = ({
  sponsorList,
  mediaPartnerList,
  additionalList,
}: FooterProps): JSX.Element => {
  const t = useTranslations("Footer");

  return (
    <>
      <div className="mt-12 sm:mt-20">
        <NewsletterRegistration />
      </div>
      <div className="flex flex-row mt-4 justify-center flex-wrap">
        {socialMedia.map((element, index) => (
          <Link
            href={element.url}
            key={index}
            className="mx-2 mb-3 sm:mx-3 sm:mb-0"
          >
            <Bubble>
              <NextImage
                src={element.imageUrl}
                layout="fill"
                objectFit="contain"
              />
            </Bubble>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 p-3">
        <Partner
          label={t("sponsors").toString()}
          list={sponsorList}
          className="mt-4 sm:mt-6"
        />
        <Partner
          label={t("media-partners").toString()}
          list={mediaPartnerList}
          className="mt-4 sm:mt-6"
        />
        <Partner
          label={t("supported-by").toString()}
          list={additionalList}
          className="mt-4 sm:mt-6"
        />
      </div>
      <div className="w-full text-center p-3 mb-8 sm:mb-16 font-content mx-auto max-w-3xl">
        <p>
          Immergut Festival / Am Bürgerseeweg 28 / 17235 Neustrelitz
          <br />
          {t("disclaimer").toString()}
        </p>
        <p className="mt-4">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>
          , structured content powered by{" "}
          <Link href="https://www.sanity.io">sanity.io</Link>, hosted by{" "}
          <Link href="https://www.vercel.com?utm_source=website-2021&utm_campaign=oss">
            vercel.com
          </Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
