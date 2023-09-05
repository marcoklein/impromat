/**
 * Mapping table from original tag => new tag entries
 */
const splitTagsMapping: Record<string, string[]> = {
  'Raumlauf-Bewegung': ['Raumlauf', 'Bewegung'],
  'Charakter/Figur': ['Charakter', 'Figur'],
  'Musik und Gesang': ['Musik', 'Gesang'],
  'Slapstick-Hektik-Action': ['Slapstick', 'Action'],
  'Kennenlernen - Namensspiele': ['Kennenlernen', 'Namen'],
  'Angebot/Annahme': ['Angebot', 'Annahme'],
  'Körperkontakt und Berührung': ['Körperkontakt', 'Berührung'],
  'Im Kreis': ['Aufwärmspiel', 'Kreis'],
  'Tanz/Choreographie': ['Tanz', 'Choreographie'],
  'Stimme - Gesang': ['Stimme', 'Gesang'],
};

const mappingTableDe: Record<string, string[]> = {
  'Aktion und Reaktion': [],
  Akzeptieren: [],
  Angebot: [],
  Annahme: [],
  Assoziieren: [],
  Atmung: [],
  Aufwärmspiel: ['Aufwärmspiele', 'warmup'],
  Ausdruck: [],
  Basisinformation: ['Basisinformationen'],
  Begriffserklärung: ['Begriffserklärungen'],
  Berührung: [],
  Bewegung: [],
  Buchstabenspiel: ['Buchstabenspiele'],
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
  Gruppe: ['Gruppen'],
  Impuls: [],
  Kennenlernen: ['Kennenlernspiele'],
  Kettenspiel: ['Kettenspiele'],
  Konzentration: [],
  Kreis: [],
  Körperkontakt: [],
  Langform: ['Langformen', 'longform'],
  Multitasking: [],
  Musik: ['Musikspiele'],
  Namen: [],
  Paarbildung: ['Paare'],
  Pantomime: [],
  Ratespiel: ['Ratespiele'],
  Raumlauf: [],
  Reden: [],
  Regiespiel: ['Regiespiele'],
  Reim: ['Reimen'],
  Replay: ['Replays'],
  Raum: ['Räume'],
  Schnelligkeit: [],
  'Schwarz auf Weiß': [],
  Showform: ['Showformen', 'show'],
  Slapstick: [],
  Sonstige: ['Sonstiges'],
  Gegenstand: ['Spiele mit Gegenständen'],
  Status: [],
  Stimme: [],
  Switch: ['Switches'],
  Synchro: [],
  Tanz: [],
  Vertrauen: ['Vertrauensübungen'],
  Wahrnehmung: [],
  Zuhören: [],
  'Zuschauer auf der Bühne': [],
  Übung: ['exercise'],
  Spiel: ['game'],
};

const mappingTableEn: Record<string, string[]> = {
  // guideline: singular, lowercase, no special characters
  game: ['Improv Games', 'Handle'],
  warmup: ['Warm-ups', 'Warm-Up', 'Warm Ups'],
  exercise: ['Improv Exercises', 'Exercise'],
  icebreaker: ['Icebreaker Games'],
  show: ['Improv Forms', 'Shows', 'Improv Shows'],

  longform: ['Long-Form', 'Longform'],

  switch: ['Switches'],
  accepting: ['Accepting'],
  music: ['Music Games', 'Musical Improv'],

  speech: ['Speech'],
  dialogue: ['Dialogue Form'],
  storytelling: ['Storytelling'],
  talking: ['Talking'],
  listening: ['Listening'],

  dubbing: ['Dubbing'],
  replay: ['Replay'],
  chain: ['Chain Games'],
  association: ['Association'],
  character: ['Character', 'Characters', 'characters'],

  status: ['Status'],

  objects: ['Objects'],
  group: ['Group'],
  speed: ['Speed'],
  other: ['Other'],
  letter: ['Letter Games'],
  emotion: ['Emotion Games'],
  'In Black and White': [],
  perception: ['Perception'],
  'slapstick-bustle-action': ['Slapstick-Bustle-Action'],
  direction: ['Direction Games'],
  guessing: ['Guessing Games'],
  impulse: ['Impulse'],
  finding: ['Finding Game'], // what is finding?
  'Action Reaction': [],
  rhyme: ['Rhyming'],
  expression: ['Expression'],
  movement: ['Physicalness - Movement'],
  'audience on stage': ['Audience on stage'],
  audience: [],

  organisation: ['Organisation'], // required?
  'Rules & Tips': [], // required?

  // improvressourcecenter
  opening: ['Openings'],
  'Organic Improv': [],
  Stubs: [],
  'New York City': [],
  Concepts: [],
  'Improv Groups': [],
  'Object Work': [],
  Baltimore: [],
  Shortform: [],
  'Space Work': [],
  'Improv Podcasts': [],

  // learnimprov
  circle: [],
  line: [],
  pairs: [],
  milling: [], // room walk
  problem: ['Problem'],

  environment: ['Environment', 'environments'],

  ensemble: [], // group?
  Teamwork: [], // group?

  /*
  SELECT et."name", count(et.id) FROM "Element" e 
INNER JOIN "_ElementToElementTag" etet ON etet."A" = e.id
INNER JOIN "ElementTag" et ON etet."B" = et."id"
WHERE e."sourceName" = 'learnimprov' AND e."languageCode" = 'en' AND e."snapshotParentId" IS NULL -- AND et."name" ~ '^[A-Z].*'
GROUP BY et."name"
HAVING count(et.id) >= 3
ORDER BY count(et.id) DESC;
  */
  // TODO

  words: [],
  endowments: [],
  'mime object': [],
  Accepting: [],
  'ice breaker': [],
  commitment: [],
  Less: [],
  Propel: [],
  failure: [],
  gibberish: [],
  setting: [],
  'mime environment': [],
  Mime: [],
  silly: [],
  STEPS: [],
  support: [],
  emotions: [],
  mime: [],
  dub: [],
  Focus: [],
  narrative: [],
  voice: [],
  clapping: [],
  transfer: [],
  sentences: [],
  competition: [],
  Exploration: [],
  names: [],
  Relationships: [],
  trust: [],
  numeracy: [],
  lace: [],
  grammar: [],
  Ties: [],
  'open scene': [],
  rhythm: [],
  song: [],
  pose: [],
  puns: [],
  reactions: [],
  Cold: [],
  prop: [],
  walking: [],
  dog: [],
  conducted: [],
  strings: [],
  replace: [],
  clump: [],
  'three way': [],
  chase: [],
  radio: [],
  die: [],
  categories: [],
  safety: [],
  jumping: [],
};

export function transformTagNames(
  tagNames: string[],
  languageCode: string | undefined,
) {
  let newTags = tagNames;
  if (!languageCode || languageCode === 'de') {
    // fix weird mappings like
    // * 'ÜbungenAusdruck',
    // * 'ÜbungenGefühle - Übungen',
    // * 'Spiele im ImprotheaterSpiele mit Gegenständen',
    // * 'ÜbungenImpuls',
    // * 'Spiele im ImprotheaterRatespiele',
    // * 'AufwärmspieleKennenlernen - Namensspiele',
    // * 'ÜbungenSonstiges',
    // * 'ÜbungenPantomime Übungen',
    newTags = newTags.map((tag) =>
      tag
        .replaceAll(/^Übungen([^ ])/g, '$1')
        .replaceAll(/^Spiele im Improtheater([^ ])/g, '$1')
        .replaceAll(/^Aufwärmspiele([^ ])/g, '$1')
        .replaceAll(/ - Übungen$/g, '')
        .replaceAll(/ Übungen$/g, ''),
    );

    newTags = newTags.flatMap(
      (existingTag) => splitTagsMapping[existingTag] ?? existingTag,
    );

    newTags = newTags.flatMap((existingTag) => {
      for (const [targetTag, sourceTags] of Object.entries(mappingTableDe)) {
        if (sourceTags.indexOf(existingTag) !== -1) {
          return targetTag;
        }
      }
      return existingTag;
    });
  }
  if (!languageCode || languageCode === 'en') {
    newTags = tagNames.flatMap((existingTag) => {
      for (const [targetTag, sourceTags] of Object.entries(mappingTableEn)) {
        if (sourceTags.indexOf(existingTag) !== -1) {
          return targetTag;
        }
      }
      return existingTag;
    });
  }

  newTags = [...new Set(newTags)];

  return { tags: newTags.sort() };
}
