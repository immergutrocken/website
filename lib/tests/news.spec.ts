import { getNewsLinkList } from "../news";
import client from "../shared/sanityClient";

describe("News", () => {
  it("getNewsList", () => {
    const spy = jest.spyOn(client, "fetch");
    getNewsLinkList("de");
    expect(spy).toHaveBeenCalled();
  });
});
