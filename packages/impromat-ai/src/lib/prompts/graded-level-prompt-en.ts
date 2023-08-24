import { GamePromptWithTagsOutput, TagOutput } from "./prompts";

export class GradedLevelPromptEn extends GamePromptWithTagsOutput {
  createPrompt(): string {
    const game = this.input;
    return [
      "You categorize improvisation theater games by their game complexity.",
      "For this you categorize the following game marked by ```.",
      "",
      "The rating is from a scale of 0 (very simple sequence and very simple rules) to 10 (very complex sequence and rules).",
      "",
      'Output the appropriate minimum and maximum level in JSON: `{"minimumLevel": 0-10, "maximumLevel": 0-10, "recommendedLevel": 0-10, "reasonMinimumLevel": "<Reason>", "reasonMaximumLevel": "<Reason>", "reasonRecommendedLevel": "<Reason>"}`.',
      "",
      "```",
      `Name: ${game.name}`,
      `Tags: ${game.tags.join(", ")}`,
      "",
      game.markdown,
      "```",
    ].join("\n");
  }
  parseResponse(response: string): TagOutput[] {
    const parsedResponse = JSON.parse(response) as {
      minimumLevel: string;
      maximumLevel: string;
      recommendedLevel: string;
      reasonMinimumLevel: string;
      reasonMaximumLevel: string;
      reasonRecommendedLevel: string;
    };
    return [
      {
        name: `min-${parsedResponse.minimumLevel}`,
        reason: parsedResponse.reasonMinimumLevel,
        type: `level`,
      },
      {
        name: `max-${parsedResponse.maximumLevel}`,
        reason: parsedResponse.reasonMaximumLevel,
        type: `level`,
      },
      {
        name: `recommended-${parsedResponse.recommendedLevel}`,
        reason: parsedResponse.reasonRecommendedLevel,
        type: `level`,
      },
    ];
  }
}
