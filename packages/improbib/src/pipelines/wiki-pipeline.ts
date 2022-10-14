import { ImprovEntry } from "../common/improv-entry";
import { WebsiteExtractor } from "./website-extractor";

export interface PipelineRunParameters {
  websiteExtractor: WebsiteExtractor;
}

/**
 * Extract and transform data
 */
export interface WikiPipeline {
  /**
   * Runs pipeline that yields improv entries.
   */
  run(parameters: PipelineRunParameters): Promise<ImprovEntry[]>;
}
