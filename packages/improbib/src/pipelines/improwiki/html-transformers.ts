import { CheerioAPI } from "cheerio";

export interface ImprowikiHtmlTransformer {
  name: string;
  transform: ($: CheerioAPI) => void;
}

export const improwikiHtmlTransformers: ImprowikiHtmlTransformer[] = [
  {
    name: "RemoveTableOfContents",
    transform($) {
      $('.wikipage .wikiarticle .row .col-lg-9 table[class="toc"]').remove();
    },
  },
];
