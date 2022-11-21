import { useRxDocument } from "rxdb-hooks";
import {
  WorkshopDocType,
  WorkshopDocument,
} from "./collections/workshop-collection";

export function useWorkshop(id: string): {
  workshop: WorkshopDocument;
  isFetching: boolean;
} {
  const { result: workshop, isFetching } = useRxDocument<WorkshopDocType>(
    "workshops",
    id,
    { json: false },
  );
  return { workshop: workshop as any as WorkshopDocument, isFetching };
}
