import { ImprovEntry } from "../common/improv-entry";

/**
 * Mapping table from original tag => new tag entries
 */
const splitTagsMapping: Record<string, string[]> = {
  "Raumlauf-Bewegung": ["Raumlauf", "Bewegung"],
  "Charakter/Figur": ["Charakter", "Figur"],
  "Musik und Gesang": ["Musik", "Gesang"],
  "Slapstick-Hektik-Action": ["Slapstick", "Action"],
  "Kennenlernen - Namensspiele": ["Kennenlernen", "Namen"],
  "Angebot/Annahme": ["Angebot", "Annahme"],
  "Körperkontakt und Berührung": ["Körperkontakt", "Berührung"],
  "Im Kreis": ["Aufwärmspiel", "Kreis"],
  "Tanz/Choreographie": ["Tanz", "Choreographie"],
  "Stimme - Gesang": ["Stimme", "Gesang"],
};

const finalMappingTable: Record<string, string[]> = {
  Action: [],
  "Aktion und Reaktion": [],
  Akzeptieren: [],
  Angebot: [],
  Annahme: [],
  Assoziieren: [],
  Atmung: [],
  Aufwärmspiel: ["Aufwärmspiele", "warmup"],
  Ausdruck: [],
  Basisinformation: ["Basisinformationen"],
  Begriffserklärung: ["Begriffserklärungen"],
  Berührung: [],
  Bewegung: [],
  Buchstabenspiel: ["Buchstabenspiele"],
  Charakter: [],
  Choreographie: [],
  Dialogformen: [],
  Dramaturgie: [],
  Erzählen: [],
  Figur: [],
  Fokus: [],
  Gedächtnis: [],
  Gefühle: [],
  Gefühlsspiele: [],
  Genreliste: [],
  Gesang: [],
  Gruppe: ["Gruppen"],
  Impuls: [],
  Kennenlernen: ["Kennenlernspiele"],
  Kettenspiel: ["Kettenspiele"],
  Konzentration: [],
  Kreis: [],
  Körperkontakt: [],
  Langform: ["Langformen", "longform"],
  Multitasking: [],
  Musik: ["Musikspiele"],
  Namen: [],
  Paarbildung: ["Paare"],
  Pantomime: [],
  Ratespiel: ["Ratespiele"],
  Raumlauf: [],
  Reden: [],
  Regiespiel: ["Regiespiele"],
  Reimen: [],
  Replay: ["Replays"],
  Raum: ["Räume"],
  Schnelligkeit: [],
  "Schwarz auf Weiß": [],
  Showform: ["Showformen", "show"],
  Slapstick: [],
  Sonstige: ["Sonstiges"],
  Gegenstand: ["Spiele mit Gegenständen"],
  Status: [],
  Stimme: [],
  Switch: ["Switches"],
  Synchro: [],
  Tanz: [],
  Vertrauen: ["Vertrauensübungen"],
  Wahrnehmung: [],
  Zuhören: [],
  "Zuschauer auf der Bühne": [],
  Übung: ["exercise"],
  Spiel: ["game"],
};

/**
 * Improwiki sometimes returns weird tag names like:
 *
 * 'ÜbungenAusdruck',
 * 'ÜbungenGefühle - Übungen',
 * 'Spiele im ImprotheaterSpiele mit Gegenständen',
 * 'ÜbungenImpuls',
 * 'Spiele im ImprotheaterRatespiele',
 * 'AufwärmspieleKennenlernen - Namensspiele',
 * 'ÜbungenSonstiges',
 * 'ÜbungenPantomime Übungen',
 *
 * This transform will remove all those unnecessary prefixes.
 *
 * Additionally, it will "split up" tags that describe two tags like:
 * "Raumlauf-Bewegung": ["Raumlauf", "Bewegung"],
 *
 * Lastly, it will rename tags to create consistency regarding naming.
 *
 * @param improbibElement
 * @returns
 */
export function transformImprowikiDeTags(improbibElement: ImprovEntry) {
  if (
    improbibElement.sourceName === "improwiki" &&
    improbibElement.languageCode === "de"
  ) {
    let newTags = improbibElement.tags.map((element) =>
      element
        .replaceAll(/^Übungen([^ ])/g, "$1")
        .replaceAll(/^Spiele im Improtheater([^ ])/g, "$1")
        .replaceAll(/^Aufwärmspiele([^ ])/g, "$1")
        .replaceAll(/ - Übungen$/g, "")
        .replaceAll(/ Übungen$/g, ""),
    );

    newTags = newTags.flatMap(
      (existingTag) => splitTagsMapping[existingTag] ?? existingTag,
    );

    newTags = newTags.flatMap((existingTag) => {
      for (const [targetTag, sourceTags] of Object.entries(finalMappingTable)) {
        if (sourceTags.indexOf(existingTag) !== -1) {
          return targetTag;
        }
      }
      return existingTag;
    });

    newTags = [...new Set(newTags)];

    return { tags: newTags.sort() };
  }
}
