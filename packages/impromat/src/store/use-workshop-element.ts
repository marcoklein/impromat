import { useMemo } from "react";
import { Element } from "./schema.gen";
import { useWorkshop } from "./use-workshop";
import { WORKSHOP_HELPER } from "./workshop-helper";

export function useWorkshopElement(
  workshopId: string,
  workshopElementId: string,
) {
  const { workshop, isFetching } = useWorkshop(workshopId);

  const workshopElement: Element | undefined = useMemo(() => {
    if (!isFetching && workshop && workshop.sections) {
      return WORKSHOP_HELPER.findElement(workshop, workshopElementId)?.element;
    }
    return undefined;
  }, [workshop, isFetching, workshopElementId]);

  return { workshopElement, isFetching };
}
