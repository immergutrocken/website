import { getNewsLinkList } from "../news";
import client from "../shared/sanityClient";

describe("News", () => {
  xit("getNewsList", () => {
    const spy = jest.spyOn(client, "fetch");
    getNewsLinkList("de");
    expect(spy).toHaveBeenCalled();
  });
});
