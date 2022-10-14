import { CheerioAPI } from "cheerio";

export interface HtmlTransformer {
  name: string;
  transform: ($: CheerioAPI) => void;
}
