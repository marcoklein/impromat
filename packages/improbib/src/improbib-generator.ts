import fs from "node:fs/promises";
import { environment } from "./environment";
import { Improbib } from "./improbib";
import { ImprovresourcecenterPipeline } from "./pipelines/improvresourcecenter/improvresourcecenter-pipeline";
import { ImprowikiPipeline } from "./pipelines/improwiki/improwiki-pipeline";
import { LearnImprovPipeline } from "./pipelines/learnimprov/learnimprov-pipeline";
import { PipelineAggregator } from "./pipelines/pipeline-aggregator";

export class ImprobibGenerator {
  async run(): Promise<Improbib> {
    const pipelineAggregator = new PipelineAggregator([
      new ImprowikiPipeline(),
      new ImprovresourcecenterPipeline(),
      new LearnImprovPipeline(),
    ]);
    const improbibEntries = await pipelineAggregator.run();
    const elements = improbibEntries.filter(
      (entry) => entry.type === "element",
    );

    const tags: Record<string, string> = {};
    for (const element of improbibEntries) {
      for (const entryTag of element.tags) {
        tags[entryTag] = entryTag;
      }
    }

    const sourceUrls: Record<string, string> = {};
    for (const element of improbibEntries) {
      sourceUrls[element.baseUrl] = element.baseUrl;
    }

    const improbib: Improbib = {
      version: environment.VERSION,
      timestamp: new Date().toISOString(),
      statistics: {
        numberOfElements: elements.length,
        numberOfTags: Object.values(tags).length,
      },
      sourceUrls: Object.values(sourceUrls),
      tagNames: Object.values(tags),
      elements,
    };

    await fs.writeFile(
      `${environment.OUTPUT_FILE_PATH}`,
      JSON.stringify(improbib, undefined, 2),
    );
    return improbib;
  }
}
