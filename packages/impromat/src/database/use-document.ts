import { useRxDocument } from "rxdb-hooks";
import { ElementDocument } from "./collections/element/element-collection";
import { MeDocType } from "./collections/me/me-collection";
import { SectionDocument } from "./collections/section/section-collection";
import { UserDocument } from "./collections/user/user-collection";
import {
  WorkshopDocType,
  WorkshopDocument,
} from "./collections/workshop/workshop-collection";
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
