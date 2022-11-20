export interface ElementModel {
  updatedAt: number;

  id: string;
  version: number;
  name: string;
  markdown: string;
  tags: string[];
  note: string;
  basedOn: string | undefined;
  languageCode: String | undefined;
  sourceUrl: String | undefined;
  sourceName: String | undefined;
  sourceBaseUrl: String | undefined;
  licenseName: String | undefined;
  licenseUrl: String | undefined;
}
