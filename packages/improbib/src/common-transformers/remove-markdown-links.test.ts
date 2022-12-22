import { expect } from "chai";
import { extractOutgoingLinks } from "./extract-outgoing-links";
import { removeMarkdownLinks } from "./remove-markdown-links";

describe("remove markdown links", () => {
  it("should remove links from markdown", async () => {
    // given
    const element = {
      markdown: "[Text Space](link.com) test [Text](other.com)",
    };
    // when
    const result = removeMarkdownLinks(element);
    // then
    expect(result.markdown).to.equal(`Text Space test Text`);
  });
});
