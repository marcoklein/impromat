import { useCallback } from "react";
import { RxCollection } from "rxdb";
import { useRxData } from "rxdb-hooks";
import { WorkshopDocType } from "./collections/workshop-collection";

export function useWorkshops() {
  const { result: workshops, isFetching } = useRxData<WorkshopDocType>(
    "workshops",
    useCallback(
      (collection: RxCollection<WorkshopDocType>) => collection.find(),
      [],
    ),
  );
  return { workshops, isFetching };
}
