import { ImprobibElement } from "improbib";
import { ElementDocType } from "../database/collections/element/element-collection";

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
}: ImprobibElement): ElementDocType {
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
