import { Debugger } from "debug";
import { useCallback, useEffect } from "react";
import { RxCollection } from "rxdb";
import { useRxData } from "rxdb-hooks";
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

export function useDocuments<
  T extends keyof AppCollections,
  K = DocumentMappingType<T>,
>(
  collectionName: T,
  ids: string[] | undefined,
  logger?: Debugger,
): {
  documents: K[] | undefined;
  isFetching: boolean;
} {
  const { result: documents, isFetching } = useRxData<any[]>(
    collectionName,
    useCallback(
      (collection: RxCollection) => collection.findByIds(ids ?? []),
      [ids],
    ),
  );

  useEffect(() => {
    if (logger)
      logger(
        "useDocument - update of collection %s with document %o",
        collectionName,
        documents,
      );
  }, [collectionName, documents, logger]);

  return { documents: documents as K[], isFetching };
}
