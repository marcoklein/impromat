import { CheerioAPI } from "cheerio";
import { htmlToMarkdownParser } from "../../common/html-to-markdown-parser";
import { ImprovElement, ImprovEntry } from "../../common/improv-entry";
import { toAbsoluteUrl } from "../../common/to-absolute-url";
import { toBaseUrl } from "../../common/to-base-url";
import { PipelineRunParameters, WikiPipeline } from "../wiki-pipeline";
import { EntryPage } from "./entry-page";
import { improwikiHtmlTransformers } from "./html-transformers";

/**
 * Parser an entry page.
 */
export class ImprowikiEntryPagePipeline implements WikiPipeline {
  constructor(private readonly entryPage: EntryPage) {}

  async run({
    websiteExtractor,
  }: PipelineRunParameters): Promise<ImprovEntry[]> {
    const { $ } = await websiteExtractor.extract(this.entryPage.url);
    // TODO fetch from cache
    const accessDate = new Date().toISOString();

    const baseUrl = toBaseUrl(this.entryPage.url);

    const entryUrls = $(".startpage > .container")
      .find("a")
      .map((_, { attributes }) =>
        attributes
          .filter(({ name }) => name === "href")
          .map(({ value }) => value),
      )
      .toArray()
      .map((entryUrl) => toAbsoluteUrl(entryUrl, baseUrl));

    const resultEntries: ImprovEntry[] = [];

    for (const entryUrl of entryUrls) {
      const entryContent = await websiteExtractor.extract(entryUrl);
      const changes: string[] = [];

      for (const htmlTransformer of improwikiHtmlTransformers) {
        const previousHtml = entryContent.$.html();
        htmlTransformer.transform(entryContent.$);
        if (entryContent.$.html() !== previousHtml) {
          changes.push(htmlTransformer.name);
        }
      }

      const entries = await this.htmlToImprovElement(entryContent.$);
      const {
        // TODO extract those attributes into a single interface to directly merge them
        languageCode,
        licenseName,
        licenseSpdxIdentifier,
        licenseUrl,
        addTags,
        sourceName,
      } = this.entryPage;
      const entriesWithSourceContext = entries.map(
        (entry): ImprovEntry => ({
          ...entry,
          changes,
          sourceName,
          languageCode,
          licenseName,
          licenseSpdxIdentifier,
          licenseUrl,
          sourceUrl: entryUrl,
          sourceAccessDate: accessDate,
          baseUrl,
        }),
      );
      for (const entry of entriesWithSourceContext) {
        if ("tags" in entry) {
          entry.tags.push(...addTags);
        }
      }

      resultEntries.push(...entriesWithSourceContext);
    }

    return resultEntries;
  }

  // TODO convert to transformer chain
  private async htmlToImprovElement(
    $: CheerioAPI,
  ): Promise<
    Array<
      Pick<ImprovElement, "type" | "name" | "markdown" | "tags" | "customData">
    >
  > {
    if ($(".wikipage").length !== 1) return [];

    const title = $(".wikipage .container h1").first().text().trim();
    const html = $(".wikipage .wikiarticle .row .col-lg-9").html() ?? "";

    const file = await htmlToMarkdownParser.process(html.trim());
    const markdown = file.toString("utf8");
    const name = title?.replaceAll("#", "").trim();
    const tags = $(".wikipage .text-left a")
      .map((_, element) => $(element).text().trim())
      .toArray()
      .filter((text) => text.includes("#"))
      .map((text) => text.replaceAll("#", "").trim());

    const lastUpdate = $("small").text().split(":")[1].split("by")[0].trim();

    const translationLinkEn = $("li:contains('englische Version')")
      .find("a")
      .attr("href");

    const translationLinkDe = $("li:contains('german version')")
      .find("a")
      .attr("href");

    const fields: Record<string, string> = {};
    $(".card-body dl.row dt").each(function () {
      const key = $(this).text().trim();
      const value = $(this).next("dd").text().trim();
      fields[key] = value;
    });

    return [
      {
        type: "element",
        name,
        markdown,
        tags,
        customData: {
          lastUpdate,
          translationLinkEn,
          translationLinkDe,
          cardData: fields,
        },
      },
    ];
  }
}
