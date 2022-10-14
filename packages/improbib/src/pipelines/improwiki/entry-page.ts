/**
 * Website that contains links to improv entries.
 * Usually some overview website that e.g. lists all games or all exercises of a certain category or just everything of a website.
 */
export interface EntryPage {
  url: string;
  /**
   * Tags to add that inherently belong to this entry page.
   */
  addTags: string[];

  sourceName: string;
  languageCode: string;
  licenseName: string;
  licenseSpdxIdentifier: string;
  licenseUrl: string;
}
