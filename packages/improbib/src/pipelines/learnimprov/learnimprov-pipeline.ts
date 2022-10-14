import { ImprovEntry } from "../../common/improv-entry";
import { improbibTags } from "../common-tags";
import { EntryPage } from "../improwiki/entry-page";
import { PipelineRunParameters, WikiPipeline } from "../wiki-pipeline";
import { LearnImprovEntryPagePipeline } from "./learnimprov-entry-page-pipeline";

export class LearnImprovPipeline implements WikiPipeline {
  async run(runParameters: PipelineRunParameters) {
    const entryPages: EntryPage[] = [
      ...[
        {
          url: "https://www.learnimprov.com/warm-ups/",
          addTags: [improbibTags.warmup],
        },
        {
          url: "https://www.learnimprov.com/exercises/",
          addTags: [improbibTags.exercise],
        },
        {
          url: "https://www.learnimprov.com/handles/",
          addTags: [improbibTags.game],
        },
      ].map((parameters) => ({
        ...parameters,
        sourceName: "learnimprov",
        languageCode: "en",
        licenseName:
          "Creative Commons 4.0Attribution-ShareAlike 4.0 International",
        licenseSpdxIdentifier: "CC-BY-4.0",
        licenseUrl: "https://www.gnu.org/licenses/fdl-1.3.html",
      })),
    ];

    const resultEntries: ImprovEntry[] = [];

    for (const entryPage of entryPages) {
      const pagePipeline = new LearnImprovEntryPagePipeline(entryPage);
      const entries = await pagePipeline.run(runParameters);
      resultEntries.push(...entries);
    }

    return resultEntries;
  }
}
