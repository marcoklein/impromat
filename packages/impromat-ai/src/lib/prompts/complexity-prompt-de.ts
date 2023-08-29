import { GamePromptWithTagsOutput, TagOutput } from "./prompts";

export class ComplexityPromptDe extends GamePromptWithTagsOutput {
  createPrompt(): string {
    const game = this.input;
    return [
      "Du kategorisierst Improvisationstheater Spiele nach ihrer Spiele-Komplexitaet.",
      "Dafuer kategorisierst du folgendes, durch ``` markiertest Spiel.",
      "",
      "Die Komplexitaet bezieht sich auf den Ablauf des Spiels. Diese kann folgende Werte annehmen:",
      "- `EINFACH`: Das Spiel ist sehr einfach und hat einen einfachen Ablauf.",
      "- `EHER EINFACH`: Das Spiel hat eher einen einfachen Ablauf als einen komplexen.",
      "- `EHER KOMPLEX`: Das Spiel hat eher einen komplexen Ablauf als einen einfachen.",
      "- `KOMPLEX`: Das Spiel hat einen komplexen Ablauf.",
      "",
      "Gib die Komplexitaet als einen Bereich in folgendem JSON Format aus:",
      '`{"mindestKomplexitaet": "EINFACH|EHER EINFACH|EHER KOMPLEX|KOMPLEX", "maximalKomplexitaet": "EINFACH|EHER EINFACH|EHER KOMPLEX|KOMPLEX", "empfohleneKomplexitaet": "EINFACH|EHER EINFACH|EHER KOMPLEX|KOMPLEX", "grundMindestKomplexitaet": "<Grund der Auswahl>", "grundMaximalKomplexitaet": "<Grund der Auswahl>", "grundEmpfohleneKomplexitaet": "<Grund der Auswahl>"}`',
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
        name: `empfohlen-${parsedResponse.empfohleneKomplexitaet}`,
        reason: parsedResponse.grundEmpfohleneKomplexitaet,
        type: `complexity`,
      },
    ];
  }
}
