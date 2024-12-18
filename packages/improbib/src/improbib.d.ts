export interface Improbib {
  /**
   * Current version of the database in semVer format.
   * @example 1.2.0
   */
  version: string;
  /**
   * Timestamp of file generation.
   */
  timestamp: string;
  statistics: {
    numberOfElements: number;
    numberOfTags: number;
  };
  sourceUrls: string[];
  /**
   * All available tag names.
   */
  tagNames: string[];
  /**
   * Contains all exercises, games, warmups, show formats, and anything
   * that is related to some inspiration for an improvisational theatre practice.
   */
  elements: ImprobibElement[];
}

export interface BaseImprovEntry {
  type: string;

  sourceName: string;
  sourceUrl: string;
  baseUrl: string;
  languageCode: string;
  licenseName: string;
  licenseSpdxIdentifier: string;
  licenseUrl: string;
  sourceAccessDate: string;
}

export interface ImprobibElement extends BaseImprovEntry {
  type: "element";
  name: string;
  markdown: string;
  tags: string[];
  /**
   * List of changes that were applied to the markdown content.
   */
  changes: string[];
  identifier: string;
  outgoingLinks: { title: string | undefined; url: string }[];
  /**
   * Additional metadata loaded from individual sources.
   */
  customData: {
    lastUpdate?: string;
    translationLinkEn?: string;
    translationLinkDe?: string;
    Spieltyp?: string;
    "Anzahl Spieler"?: string;
    Erfahrung?: string;
    Dynamik?: string;
    [key: string]: string | undefined;
  };
}
