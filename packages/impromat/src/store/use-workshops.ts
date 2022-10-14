import { useCallback } from "react";
import { RxCollection } from "rxdb";
import { useRxData } from "rxdb-hooks";
import { Workshop } from "./schema.gen";

export function useWorkshops() {
  const { result: workshops, isFetching } = useRxData<Workshop>(
    "workshops",
    useCallback((collection: RxCollection<Workshop>) => collection.find(), []),
  );
  return { workshops, isFetching };
}
