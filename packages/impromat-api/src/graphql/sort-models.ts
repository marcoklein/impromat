import { PullCheckpointInput } from "./schema.gen";

export function prepareDocumentsForPull<
  ModelType extends { updatedAt: number; id: string },
  DtoType
>(
  documents: Array<ModelType>,
  args: { checkpoint: PullCheckpointInput; limit: number },
  fromModelToDtoMapper: (model: ModelType) => DtoType
) {
  const limit = args.limit;
  const lastId = args.checkpoint ? args.checkpoint.id : "";
  const minUpdatedAt = args.checkpoint ? args.checkpoint.updatedAt : 0;

  const sortedDocuments = documents.sort((a, b) => {
    if (a.updatedAt === b.updatedAt) {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      else return 0;
    }
    if (a.updatedAt > b.updatedAt) return 1;
    return -1; // a.updatedAt < b.updatedAt
  });

  const filterForMinUpdatedAtAndId = sortedDocuments.filter((doc) => {
    if (doc.updatedAt < minUpdatedAt) return false;
    if (doc.updatedAt > minUpdatedAt) return true;
    if (doc.updatedAt === minUpdatedAt) {
      if (doc.id > lastId) return true;
    }
    return false;
  });

  const limitedDocuments = filterForMinUpdatedAtAndId.slice(0, limit);

  // use the last document for the checkpoint
  function getCheckpoint(docs: any[]): {
    id: string;
    updatedAt: number;
  } {
    if (docs.length > 0) {
      const lastDoc = docs[docs.length - 1];
      return {
        id: lastDoc.id,
        updatedAt: lastDoc.updatedAt,
      };
    }
    return {
      id: lastId,
      updatedAt: minUpdatedAt,
    };
  }

  return {
    documents: limitedDocuments.map((document) =>
      fromModelToDtoMapper(document)
    ),
    checkpoint: getCheckpoint(limitedDocuments),
  };
}
