import { GamePromptWithTagsOutput, TagOutput } from "./prompts";

export class GradedLevelPromptDe extends GamePromptWithTagsOutput {
  createPrompt(): string {
    const game = this.input;
    return [
      "Du bewertest ein das Erfahrungslevel, welches fuer ein Improvisationstheater Spiel empfohlen ist.",
      "Dafuer willst du folgendes, durch ``` markiertest Spiel bewerten.",
      "",
      "Die Bewertung ist von einer Skala von 0 (absolute Anfaenger mit keiner Improvisations- oder Theatererfahrung) bis 10 (sehr erfahrene Improvisationstheater Profis).",
      "",
      'Gib das passende Mindest- und Maximallevel in JSON aus: `{"mindestErfahrung": 0-10, "maximalErfahrung": 0-10, "grund": "<Grund der Auswahl>"}`.',
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
      mindestErfahrung: number;
      maximalErfahrung: number;
      grund: string;
    };
    return [
      {
        name: `min-${parsedResponse.mindestErfahrung}`,
        reason: parsedResponse.grund,
        type: `level`,
      },
      {
        name: `max-${parsedResponse.maximalErfahrung}`,
        reason: parsedResponse.grund,
        type: `level`,
      },
    ];
  }
}
