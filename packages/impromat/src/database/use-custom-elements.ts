import { useCallback } from "react";
import { RxCollection } from "rxdb";
import { useRxData } from "rxdb-hooks";
import { ElementDocType } from "./collections/element/element-collection";

export function useCustomElements() {
  const { result: documents, isFetching } = useRxData<ElementDocType>(
    "elements",
    useCallback(
      (collection: RxCollection) =>
        collection.find({
          selector: { basedOn: undefined, sourceName: undefined },
        }),
      [],
    ),
  );
  return { customElements: documents, isFetching };
}
