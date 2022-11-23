import { useRxDocument } from "rxdb-hooks";
import { ElementDocType } from "./collections/element/element-collection";

export function useWorkshopElement(workshopElementId: string | undefined) {
  const { result: workshopElement, isFetching } = useRxDocument<ElementDocType>(
    "elements",
    workshopElementId,
    { json: false },
  );
  return { workshopElement, isFetching };
}
