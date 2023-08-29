import { GamePromptWithTagsOutput, TagOutput } from "./prompts";

export class LevelPromptDe extends GamePromptWithTagsOutput {
  createPrompt(): string {
    const game = this.input;
    return [
      "Du kategorisierst ein Improvisationstheater Spiel und ob dieses fuer Anfaenger, Fortgeschrittene, oder Experten interessant ist.",
      "Du willst folgendes Spiel, geschrieben in Markdown und markiert durch ``` kategorisieren. Beachte dabei folgende REGELN:",
      // "- Langformen sind NUR fuer EXPERTEN geeignet.",
      // "- Langformen sind NICHT fuer FORGESCHRITTENE geeignet!",
      // // "- Kurzformen sind fuer FORGESCHRITTENE  geeignet.",
      // "- Spiele ueber 30 Minuten sind NUR fuer EXPERTEN geeignet.",
      // "- Spiele die NUR fuer EXPERTEN geeignet sind, sind NICHT fuer FORTGESCHRITTENE geeignet.",
      // "- Kennenlernspiele sind fuer ANFAENGER geeignet.",
      // "- Einfache Spiele sind fuer ANFAENGER geeignet.",
      // "- Spiele mit freien Szenen sind NICHT fuer ANFAENGER geeignet.",
      // "- Zu einfache Spiele sind langweilig und damit NICHT fuer FORTGESCHRITTENE geeignet.",
      // "- Schwierige Formate sind NICHT fuer FORTGESCHRITTENE geignet.",
      // "- FORTGESCHRITTENE koennen komplexere Spiele als Anfaenger spielen.",
      // "- EXPERTEN spielen noch komplexere Uebungen und Spiele als FORTGESCHRITTENE.",
      // "- Einfache Spiele sind NICHT fuer EXPERTEN geeignet.",
      // "- Komplexe, schwierige und lange Spiele sind NUR fuer EXPERTEN geeignet.",
      "- Spiele die laenger als 30 Minuten dauern sind NUR fuer EXPERTEN geeignet.",
      "- Spiele die laenger als 30 Minuten dauern sind NICHT fuer FORTGESCHRITTENE geeignet.",
      "- Einfache, kurze und freie Szenen sind fuer FORTGESCHRITTENE geeignet.",
      "- Kennenlernspiele sind fuer ANFAENGER geeignet.",
      "- Sehr einfache Spiele sind fuer ANFAENGER geeignet.",
      "",
      "1. Sammle zuerst maximal 7 Argumente unter Beachtung obiger REGELN (!), weshalb und weshalb nicht das Spiel fuer Anfaenger, Fortgeschrittene oder Experten passen wuerde. Ueberlege dir auch, ob das Spiel laenger als 30 Minuten dauert.",
      "2. Gib einen Separator ein: `---`",
      '3. Gib anhand der Diskussion und obigen REGELN das empfohlene Level und optional weitere passende Level in einem JSON Array aus: `[{"level": "ANFAENGER|FORTGESCHRITTENE|EXPERTEN", "reason": "<Grund der Auswahl>", "empfohlen": "JA|NEIN"}]`.',
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
    let parsedResponse = null;
    type responseType =
      | [{ level: string; reason: string; empfohlen: string }]
      | null
      | undefined;
    if (response.includes("---")) {
      const splittedResponse = response.split("---")[1].trim();
      parsedResponse = JSON.parse(splittedResponse) as responseType;
    } else {
      parsedResponse = JSON.parse(response) as responseType;
    }
    const levelMap: Record<string, string> = {
      ANFAENGER: "Anfänger",
      FORTGESCHRITTENE: "Fortgeschritten",
      EXPERTEN: "Experte",
    };

    if (!parsedResponse) {
      return [];
    }

    const mappedResponse: TagOutput[] = parsedResponse
      .filter((response) => response.empfohlen === "JA")
      .map((entry) => ({
        name: levelMap[entry.level],
        reason: entry.reason,
        type: "level",
      }));
    const uniqueTagList = mappedResponse.filter(
      (entry, index, self) =>
        index === self.findIndex((t) => t.name === entry.name)
    );
    return uniqueTagList;
  }
}
