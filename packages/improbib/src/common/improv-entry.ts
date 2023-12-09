export type ImprovEntry = ImprovElement;

export interface BaseImprovEntry {
  type: string;
  changes: string[];

  sourceName: string;
  sourceUrl: string;
  baseUrl: string;
  languageCode: string;
  licenseName: string;
  licenseSpdxIdentifier: string;
  licenseUrl: string;
  sourceAccessDate: string;
}

export interface ImprovElement extends BaseImprovEntry {
  type: "element";
  name: string;
  markdown: string;
  tags: string[];
  customData: Record<string, any | undefined>;
}
