import { DocumentModel } from "../model";

export interface DocumentExtractor {
  extractNext: () => Promise<DocumentModel | undefined>;
}
