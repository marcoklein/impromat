import { assert } from "chai";
import { addBaseUrl } from "../common-transformers/add-base-url";
import { addSourceName } from "../common-transformers/add-source-name";
import { createAbsoluteUrls } from "../common-transformers/create-absolute-urls";
import { extractOutgoingLinks } from "../common-transformers/extract-outgoing-links";
import { hashIdentifier } from "../common-transformers/hash-identifiers";
import { removeMarkdownComments } from "../common-transformers/remove-markdown-comments";
import { trimMarkdown } from "../common-transformers/trim-markdown";
import { uniqueTagList } from "../common-transformers/unique-tag-list";
import { ImprovEntry } from "../common/improv-entry";
import { TransformerChain } from "../common/transformer-chain";
import { UnpackArray } from "../common/unpack-array";
import { ImprobibEntry } from "../improbib";
import { changeImprowikiMarkdown } from "./improwiki/change-improwiki-markdown";
import { WebsiteExtractor } from "./website-extractor";
import { PipelineRunParameters, WikiPipeline } from "./wiki-pipeline";

export class PipelineAggregator {
  constructor(private readonly pipelines: WikiPipeline[]) {}

  async run(): Promise<ImprobibEntry[]> {
    const websiteExtractor = new WebsiteExtractor();
    const runParameters: PipelineRunParameters = { websiteExtractor };

    const resultEntries: ImprovEntry[] = [];
    for (const pipeline of this.pipelines) {
      const improvEntries = await pipeline.run(runParameters);
      resultEntries.push(...improvEntries);
    }

    return this.transformImprovEntries(resultEntries);
  }

  private async transformImprovEntries(improvEntries: ImprovEntry[]) {
    const identifierTransform =
      TransformerChain.create<ImprovEntry>().apply(hashIdentifier);

    const improvEntriesWithId = await identifierTransform.transformList(
      improvEntries,
    );

    const uniqueTransformedEntryDict: Record<
      string,
      UnpackArray<typeof improvEntriesWithId>
    > = {};
    for (const improvEntry of improvEntriesWithId) {
      const existingEntry = uniqueTransformedEntryDict[improvEntry.identifier];
      if (!existingEntry) {
        uniqueTransformedEntryDict[improvEntry.identifier] = improvEntry;
      } else {
        if ("tags" in existingEntry) {
          existingEntry.tags.push(...improvEntry.tags);
        }

        assert(
          existingEntry.markdown === improvEntry.markdown,
          "Content of merged improv entries does not match.",
        );
        assert(
          existingEntry.name === improvEntry.name,
          "Names of merged improv entries does not match",
        );
      }
    }

    const uniqueImprovEntries = Object.values(uniqueTransformedEntryDict);

    const commonEntryTransforms = TransformerChain.create<
      UnpackArray<typeof uniqueImprovEntries>
    >()
      .apply(removeMarkdownComments)
      .apply(createAbsoluteUrls)
      .apply(extractOutgoingLinks)
      .apply(addBaseUrl)
      .apply(addSourceName)
      .apply(changeImprowikiMarkdown)
      .apply(trimMarkdown)
      .apply(uniqueTagList);

    const transformedEntries = await commonEntryTransforms.transformList(
      uniqueImprovEntries,
    );
    const sortedEntries = transformedEntries.sort((a, b) =>
      a.identifier.localeCompare(b.identifier),
    );
    return sortedEntries;
  }
}
