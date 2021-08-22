module.exports = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "de",
  },
  async redirects() {
    return [
      {
        source: "/artist/jos%C3%A9-gonz%C3%A1lez",
        destination: "/artist/jose-gonzalez",
        permanent: true,
      },
    ];
  },
};
