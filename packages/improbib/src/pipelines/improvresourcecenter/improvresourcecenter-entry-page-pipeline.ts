import { CheerioAPI } from "cheerio";
import { htmlToMarkdownParser } from "../../common/html-to-markdown-parser";
import { ImprovElement, ImprovEntry } from "../../common/improv-entry";
import { toAbsoluteUrl } from "../../common/to-absolute-url";
import { toBaseUrl } from "../../common/to-base-url";
import { EntryPage } from "../improwiki/entry-page";
import { PipelineRunParameters, WikiPipeline } from "../wiki-pipeline";

export class ImprovresourcecenterEntryPagePipeline implements WikiPipeline {
  constructor(private readonly entryPage: EntryPage) {}

  async run({
    websiteExtractor,
  }: PipelineRunParameters): Promise<ImprovEntry[]> {
    const { $ } = await websiteExtractor.extract(this.entryPage.url);
    // TODO fetch from cache
    const accessDate = new Date().toISOString();

    const baseUrl = toBaseUrl(this.entryPage.url);

    // TODO there is code duplication with the improwiki pipeline
    // extract that into a common interface if there comes more pipelines that follow the entry page pipeline model
    const entryUrls = $("#mw-pages a")
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
    Array<Pick<ImprovElement, "type" | "name" | "markdown" | "tags">>
  > {
    const title = $("#firstHeading").text().trim();

    const tags = $("#bodyContent #catlinks ul a")
      .map((_, element) => $(element).text().trim())
      .toArray()
      .filter((text) => text !== "All");

    const html = $("#bodyContent #mw-content-text").html() ?? "";
    const markdown = (await htmlToMarkdownParser.process(html))
      .toString("utf8")
      .trim();
    return [
      {
        type: "element",
        markdown,
        name: title,
        tags,
      },
    ];
  }
}
