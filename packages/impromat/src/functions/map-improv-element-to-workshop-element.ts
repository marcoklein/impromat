import { ImprovElement } from "../models/improv-element";
import { Element } from "../store/schema.gen";

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
}: ImprovElement): Element {
  return {
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
