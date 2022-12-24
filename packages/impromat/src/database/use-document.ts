import { Debugger } from "debug";
import { useEffect } from "react";
import { useRxDocument } from "rxdb-hooks";
import { ElementDocument } from "./collections/element/element-collection";
import { MeDocType } from "./collections/me/me-collection";
import { SectionDocument } from "./collections/section/section-collection";
import { UserDocument } from "./collections/user/user-collection-types";
import { WorkshopDocument } from "./collections/workshop/workshop-collection";
import { AppCollections } from "./database-type";

type DocumentMappingType<T extends keyof AppCollections> = T extends "users"
  ? UserDocument
  : T extends "workshops"
  ? WorkshopDocument
  : T extends "elements"
  ? ElementDocument
  : T extends "sections"
  ? SectionDocument
  : T extends "me"
  ? MeDocType
  : never;

export function useDocument<
  T extends keyof AppCollections,
  K = DocumentMappingType<T>,
>(
  collection: T,
  id: string | undefined,
  logger?: Debugger,
): {
  document: K | undefined;
  isFetching: boolean;
} {
  const { result: document, isFetching } = useRxDocument(collection, id, {
    json: false,
  });

  useEffect(() => {
    if (logger)
      logger(
        "useDocument - update of collection %s with document %o, isFetching %s",
        collection,
        document,
        isFetching,
      );
  }, [collection, document, logger, isFetching]);

  return { document: document as K, isFetching };
}
