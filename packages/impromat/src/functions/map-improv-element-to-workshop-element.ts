import { ImprovElement } from "../models/improv-element";
import { ElementDocType } from "../database/collections/element/element-collection";

export function mapImprovElementToWorkshopElement({
  baseUrl,
  identifier,
  language,
  licenseFullName,
  licenseUrl,
  markdown,
  name,
  sourceName,
  sourceUrl,
  tags,
}: ImprovElement): ElementDocType {
  return {
    version: -1,
    id: identifier,
    languageCode: language,
    licenseName: licenseFullName,
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
