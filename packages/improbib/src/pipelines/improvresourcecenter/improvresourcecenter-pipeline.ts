import { ImprovEntry } from "../../common/improv-entry";
import { improbibTags } from "../common-tags";
import { EntryPage } from "../improwiki/entry-page";
import { PipelineRunParameters, WikiPipeline } from "../wiki-pipeline";
import { ImprovresourcecenterEntryPagePipeline } from "./improvresourcecenter-entry-page-pipeline";

export class ImprovresourcecenterPipeline implements WikiPipeline {
  async run(runParameters: PipelineRunParameters) {
    const entryPages: EntryPage[] = [
      ...[
        {
          url: "https://wiki.improvresourcecenter.com/index.php?title=Category:Warm_Ups",
          addTags: [improbibTags.warmup],
        },
        {
          url: "https://wiki.improvresourcecenter.com/index.php?title=Category:Improv_Forms",
          addTags: [improbibTags.show],
        },
        {
          url: "https://wiki.improvresourcecenter.com/index.php?title=Category:Openings",
          addTags: [improbibTags.show, "opening"],
        },
      ].map((parameters) => ({
        ...parameters,
        sourceName: "improvresourcecenter",
        languageCode: "en",
        licenseName: "GNU Free Documentation License 1.3",
        licenseSpdxIdentifier: "GFDL-1.3-only",
        licenseUrl: "https://www.gnu.org/licenses/fdl-1.3.html",
      })),
    ];

    const resultEntries: ImprovEntry[] = [];

    for (const entryPage of entryPages) {
      const pagePipeline = new ImprovresourcecenterEntryPagePipeline(entryPage);
      const entries = await pagePipeline.run(runParameters);
      resultEntries.push(...entries);
    }

    return resultEntries;
  }
}
