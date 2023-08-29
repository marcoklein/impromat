export abstract class Prompt<Input = unknown, Output = unknown> {
  constructor(readonly input: Input) {
    this.input = input;
  }
  abstract createPrompt(): string;
  abstract parseResponse(response: string): Output;
}
export interface GameInput {
  name: string;
  tags: string[];
  markdown: string;
}

/**
 * Interface for summarizing output in a specific tag.
 */
export interface TagOutput {
  name: string;
  reason: string;
  type: string;
}

/**
 * Interface for summarizing output in a specific tag.
 */
export abstract class GamePromptWithTagsOutput extends Prompt<
  GameInput,
  TagOutput[]
> {}

export class LearningObjectivesPromptDe extends GamePromptWithTagsOutput {
  createPrompt(): string {
    const game = this.input;
    return [
      "Du labelst Improvisationstheater Spiele mit Lernzielen.",
      "Du willst folgendes Spiel, markiert durch ``` labeln. Beachte dafuer folgende Regeln:",
      "- Beschreibe das Lernziel in EINEM singulaeren Wort.",
      "- Ein Improvisationstheater Spiel kann mehrere Lernziele haben.",
      "- Nutze die `Tags` des Spiels als Inspiration fuer die Lernziele.",
      "- Konzentriere dich auf die wichtigsten Lernziele des Spiels.",
      "- Lernziele sind spezifisch fuer Improvisationstheater oder Theater. Sprich `Teamwork` oder einfach nur `Kreativitaet` sind keine Lernziele.",
      "- Halte dich moeglichst an folgende Lernziel Beispielliste: Action, Aktion, Reaktion, Akzeptieren, Angebot, Annahme, Assoziieren, Atmung, Aufwärmspiel, Ausdruck, Basisinformation, Begriffserklärung, Berührung, Bewegung, Buchstabenspiel, Charakter, Choreographie, Dialogform, Dramaturgie, Erzählen, Figur, Fokus, Gedächtnis, Gefühl, Genre, Gesang, Gruppe, Impuls, Kennenlernen, Kette, Konzentration, Kreis, Körperkontakt, Langform, Multitasking, Musik, Namen, Paarbildung, Pantomime, Ratespiel, Raumlauf, Reden, Regiespiel, Reim, Replay, Raum, Schnelligkeit, Schwarz auf Weiß, Showform, Slapstick, Sonstige, Gegenstand, Status, Stimme, Switch, Synchro, Tanz, Vertrauen, Wahrnehmung, Zuhören, Zuschauer auf der Bühne, Übung, Spiel",
      "- Gib nur die drei bis fuenf wichtigsten Lernziele an.",
      "",
      'Gib die Lernziele mit einer kurzen Begruendung in JSON in folgendem Format aus `[{"name": "Label1", "reason": "<Grund fuer Label1>"}, {"name": "Label2", "reason": "<Grund fuer Label 2>"}]`.',
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
    const parsedResponse = JSON.parse(response) as [
      { name: string; reason: string }
    ];
    return parsedResponse.map((entry) => {
      return { name: entry.name, reason: entry.reason, type: "learning" };
    });
  }
}
`
Du erstellst Kategorien fuer Improvisationstheater Spiele. Die Kategorien sind an die Lernziele und Faehigkeiten angelegt, welche man braucht, um ein guter Improvisationstheater Spieler zu werden. - Erstelle dafuer eine Liste mit Ober- und Unterkategorien.
- Lass dich von folgeden Kategorietags inspirieren: \`Action, Aktion, Reaktion, Akzeptieren, Angebot, Annahme, Assoziieren, Atmung, Aufwärmspiel, Ausdruck, Basisinformation, Begriffserklärung, Berührung, Bewegung, Buchstabenspiel, Charakter, Choreographie, Dialogform, Dramaturgie, Erzählen, Figur, Fokus, Gedächtnis, Gefühl, Genre, Gesang, Gruppe, Impuls, Kennenlernen, Kette, Konzentration, Kreis, Körperkontakt, Langform, Multitasking, Musik, Namen, Paarbildung, Pantomime, Ratespiel, Raumlauf, Reden, Regiespiel, Reim, Replay, Raum, Schnelligkeit, Schwarz auf Weiß, Showform, Slapstick, Sonstige, Gegenstand, Status, Stimme, Switch, Synchro, Tanz, Vertrauen, Wahrnehmung, Zuhören, Zuschauer auf der Bühne, Übung, Spiel\`
- Gib deine Kategorisierung in folgendem JSON Format aus:

\`\`\`json
[{
  "name": "<Kategorie Name>",
  "unterkategorieVon" (optional): "<Name der Oberkategorie>",
  "beschreibung": "<Beschreibung der Kategorie>"
}]
\`\`\`
`;

export class TimeEstimatePromptDe extends GamePromptWithTagsOutput {
  createPrompt(): string {
    const game = this.input;
    return [
      "Du willst die Zeit von folgendem Improvisationstheater Spiel, markiert durch ``` schaetzen. Beachte dafuer folgende Regeln:",
      "- Ein Spiel dauert mindestens 5 Minuten.",
      "- Langformen dauern mindestens 30 Minuten.",
      "- Es gibt immer eine maximal Zeit und eine minimal Zeit.",
      "- Mache die Schätzung anhand der Beschreibung des Spiels.",
      "",
      'Gib die Zeitangabe in JSON in Minuten in folgendem Format aus `{"time": {"min": "<minimale Zeit>", "max": "<maximale Zeit>", "reason": "<Begruendung>", "text": "kurz|mittel|lang"}}`.',
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
    const { time } = JSON.parse(response) as {
      time: {
        min: string;
        max: string;
        reason: string;
        text: "kurz" | "mittel" | "lang";
      };
    };
    return [
      {
        name: `${time.min} - ${time.max}`,
        reason: time.reason,
        type: "time",
      },
      {
        name: `${time.text}`,
        reason: time.reason,
        type: "time-text",
      },
    ];
  }
}

export class PlayersCountPromptDe extends GamePromptWithTagsOutput {
  createPrompt(): string {
    const game = this.input;
    return [
      "Du willst die Anzahl an Spieler*innen von folgendem Improvisationstheater Spiel, markiert durch ``` schaetzen. Beachte dafuer folgende Regeln:",
      "- Mache die Schätzung anhand der Beschreibung des Spiels.",
      "- Bei Langformen braucht man mindestens 4 Spieler*innen ausser in der Beschreibung steht etwas anderes.",
      "- Manche Spiele benoetigen Paare.",
      "",
      'Gib die Anzahl in JSON in folgendem Format aus `{"spieler": {"min": "<minimale Anzahl>", "max": "<maximale Anzahl>", "reason": "<Begruendung>", "anzahl_in_text": "<wenige|durchschnittlich|viele|unbegrenzt>"}}`.',
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
    const { spieler } = JSON.parse(response) as {
      spieler: {
        min: string;
        max: string;
        reason: string;
        anzahl_in_text: "wenige" | "durchschnittlich" | "viele" | "unbegrenzt";
      };
    };
    return [
      {
        name: `${spieler.min} - ${spieler.max}`,
        reason: spieler.reason,
        type: "players-count",
      },
      {
        name: `${spieler.anzahl_in_text}`,
        reason: spieler.reason,
        type: "players-count-text",
      },
    ];
  }
}
