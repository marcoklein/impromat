import { expect } from "chai";
import { uniqueTagList } from "./unique-tag-list";

describe("unique tag list", () => {
  it("should extract unique links", async () => {
    // Given
    const inputTags = ["1", "1", "2", "2", "3"];

    // When
    const result = uniqueTagList({ tags: inputTags });
    // Then
    expect(result.tags).to.deep.equal(["1", "2", "3"]);
  });
});
