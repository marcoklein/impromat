import { expect } from "chai";
import { extractOutgoingLinks } from "./extract-outgoing-links";

describe("extract outgoing links", () => {
  it("should enrich with outgoing links", async () => {
    // Given
    const element = {
      markdown: "[Text](link.com) test [Text](other.com)",
    };
    // When
    const result = await extractOutgoingLinks(element);
    // Then
    expect(result.outgoingLinks).to.deep.equal([
      { title: "Text", url: "link.com" },
      { title: "Text", url: "other.com" },
    ]);
  });
});
