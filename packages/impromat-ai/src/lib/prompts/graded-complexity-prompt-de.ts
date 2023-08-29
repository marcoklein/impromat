import { GamePromptWithTagsOutput, TagOutput } from "./prompts";

export class GradedComplexityPromptDe extends GamePromptWithTagsOutput {
  createPrompt(): string {
    const game = this.input;
    return [
      "Du kategorisierst Improvisationstheater Spiele nach ihrer Spiele-Komplexitaet.",
      "Dafuer kategorisierst du folgendes, durch ``` markiertest Spiel.",
      "",
      "Die Bewertung ist von einer Skala von 0 (sehr einfacher Ablauf und sehr einfache Regeln) bis 10 (sehr komplexer Ablauf und Regeln).",
      "",
      'Gib das passende Mindest- und Maximallevel in JSON aus: `{"mindestKomplexitaet": 0-10, "maximalKomplexitaet": 0-10, "empfohleneKomplexitaet": 0-10, "grundMindestKomplexitaet": "<Grund der Auswahl>", "grundMaximalKomplexitaet": "<Grund der Auswahl>", "grundEmpfohleneKomplexitaet": "<Grund der Auswahl>", "text": "sehr einfach | einfach | mittel | schwer | komplex"}`.',
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
      mindestKomplexitaet: string;
      maximalKomplexitaet: string;
      empfohleneKomplexitaet: string;
      grundMindestKomplexitaet: string;
      grundMaximalKomplexitaet: string;
      grundEmpfohleneKomplexitaet: string;
      text: string;
    };
    return [
      {
        name: `min-${parsedResponse.mindestKomplexitaet}`,
        reason: parsedResponse.grundMindestKomplexitaet,
        type: `complexity`,
      },
      {
        name: `max-${parsedResponse.maximalKomplexitaet}`,
        reason: parsedResponse.grundMaximalKomplexitaet,
        type: `complexity`,
      },
      {
        name: parsedResponse.text,
        reason: parsedResponse.grundEmpfohleneKomplexitaet,
        type: `complexity-text`,
      },
      {
        name: `empfohlen-${parsedResponse.empfohleneKomplexitaet}`,
        reason: parsedResponse.grundEmpfohleneKomplexitaet,
        type: `complexity`,
      },
    ];
  }
}
