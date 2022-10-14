import { ImprovEntry } from "../../common/improv-entry";
import { WikiPipeline, PipelineRunParameters } from "../wiki-pipeline";
import { EntryPage } from "./entry-page";
import { ImprowikiEntryPagePipeline } from "./improwiki-entry-page-pipeline";

/**
 * Pipeline for https://improwiki.com
 */
export class ImprowikiPipeline implements WikiPipeline {
  async run(runParameters: PipelineRunParameters) {
    const entryPages: EntryPage[] = [
      ...[
        {
          url: "https://improwiki.com/de/spiele",
          addTags: ["game"],
        },
        {
          url: "https://improwiki.com/de/aufwaermspiele",
          addTags: ["warmup"],
        },
        {
          url: "https://improwiki.com/de/kennenlernspiele",
          addTags: ["warmup"],
        },
        {
          url: "https://improwiki.com/de/uebungen",
          addTags: ["exercise"],
        },
        {
          url: "https://improwiki.com/de/wiki/improtheater/special/category/108/showformen",
          addTags: ["show"],
        },
        {
          url: "https://improwiki.com/de/wiki/improtheater/special/category/59/langformen",
          addTags: ["longform"],
        },
      ].map((parameters) => ({
        ...parameters,
        sourceName: "improwiki",
        languageCode: "de",
        licenseName: "CC BY-SA 3.0 DE",
        licenseSpdxIdentifier: "CC-BY-SA-3.0-DE",
        licenseUrl: "https://improwiki.com/de/lizenz",
      })),
      ...[
        {
          url: "https://improwiki.com/en/improv-games",
          addTags: ["game"],
        },
        {
          url: "https://improwiki.com/en/improv-exercises",
          addTags: ["exercise"],
        },
        {
          url: "https://improwiki.com/en/warm-ups",
          addTags: ["warmup"],
        },
        {
          url: "https://improwiki.com/icebreaker-games",
          addTags: ["warmup"],
        },
        {
          url: "https://improwiki.com/en/wiki/improv/special/category/106/improv-forms",
          addTags: ["show", "longform"],
        },
      ].map((parameters) => ({
        ...parameters,
        sourceName: "improwiki",
        languageCode: "en",
        licenseName: "CC BY-SA 3.0 DE",
        licenseSpdxIdentifier: "CC-BY-SA-3.0-DE",
        licenseUrl: "https://improwiki.com/en/lizenz",
      })),
    ];

    const resultEntries: ImprovEntry[] = [];

    for (const entryPage of entryPages) {
      const pagePipeline = new ImprowikiEntryPagePipeline(entryPage);
      const entries = await pagePipeline.run(runParameters);
      resultEntries.push(...entries);
    }

    return resultEntries;
  }
}
