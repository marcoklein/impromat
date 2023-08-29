import { LevelPromptDe } from "./level-prompt-de";

describe("LevelPromptDe", () => {
  // given
  const prompt = new LevelPromptDe({
    markdown: "test",
    name: "test",
    tags: [],
  });

  it("should parse a response with JSON", () => {
    // given
    const response = `[{"level": "EXPERTEN", "reason": "test", "empfohlen": "JA"}]`;
    // when
    const result = prompt.parseResponse(response);
    // then
    expect(result).toEqual([
      {
        name: "Experte",
        reason: "test",
        type: "level",
      },
    ]);
  });

  xit("should throw an error for unexpected level", () => {
    // given
    const response = `[{"level": "Expert", "reason": "test"}]`;
    // when, then
    expect(() => prompt.parseResponse(response)).toThrowError();
  });
});
