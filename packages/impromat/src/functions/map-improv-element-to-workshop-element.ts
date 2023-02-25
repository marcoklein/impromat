import { ImprobibElement } from "improbib";

export function mapImprovElementToWorkshopElement({
  baseUrl,
  identifier,
  languageCode,
  licenseName,
  licenseUrl,
  markdown,
  name,
  sourceName,
  sourceUrl,
  tags,
}: ImprobibElement) {
  // TODO adjust with new types from new API
  return {
    version: -1,
    id: identifier,
    languageCode: languageCode,
    licenseName: licenseName,
    licenseUrl,
    markdown,
    name,
    sourceBaseUrl: baseUrl,
    tags,
    sourceName,
    sourceUrl,
    basedOn: undefined,
    note: "",
  };
}
