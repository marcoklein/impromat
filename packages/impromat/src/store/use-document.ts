import { useRxDocument } from "rxdb-hooks";
import { ElementDocument } from "./collections/element-collection";
import { MeDocType } from "./collections/me-collection";
import { SectionDocument } from "./collections/section-collection";
import { UserDocument } from "./collections/user-collection";
import {
  WorkshopDocType,
  WorkshopDocument,
} from "./collections/workshop-collection";
import { ImpromatDatabaseCollections } from "./initialize";

type DocumentMappingType<T extends keyof ImpromatDatabaseCollections> =
  T extends "users"
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
  T extends keyof ImpromatDatabaseCollections,
  K = DocumentMappingType<T>,
>(
  collection: T,
  id: string,
): {
  document: K;
  isFetching: boolean;
} {
  const { result: document, isFetching } = useRxDocument<WorkshopDocType>(
    collection,
    id,
    { json: false },
  );

  return { document: document as K, isFetching };
}
