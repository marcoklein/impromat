import { Debugger } from "debug";
import { useEffect } from "react";
import { useRxDocument } from "rxdb-hooks";
import { ElementDocType } from "./collections/element/element-collection";
import { MeDocType } from "./collections/me/me-collection";
import { SectionDocType } from "./collections/section/section-collection";
import { UserDocType } from "./collections/user/user-collection-types";
import { WorkshopDocType } from "./collections/workshop/workshop-collection";
import { AppCollections } from "./database-type";

type DocumentMappingType<T extends keyof AppCollections> = T extends "users"
  ? UserDocType
  : T extends "workshops"
  ? WorkshopDocType
  : T extends "elements"
  ? ElementDocType
  : T extends "sections"
  ? SectionDocType
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
    json: true,
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
