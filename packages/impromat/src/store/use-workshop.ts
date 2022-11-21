import { useEffect, useState } from "react";
import { useImpromatRxDb } from "../hooks/use-impromat-rx-db";
import { useLogger } from "../use-logger";
import { WorkshopDocument } from "./collections/workshop-collection";

export function useWorkshop(id: string): {
  workshop: WorkshopDocument;
  isFetching: boolean;
} {
  const database = useImpromatRxDb();
  const [workshop, setWorkshop] = useState<WorkshopDocument>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  useLogger("useWorkshop");

  useEffect(() => {
    if (!database) return;
    const subscription = database.collections.workshops
      .findByIds$([id])
      .subscribe((result) => {
        const newWorkshop = result.get(id);
        if (newWorkshop) {
          setWorkshop(newWorkshop);
          setIsFetching(false);
        } else {
          setWorkshop(undefined);
          setIsFetching(true);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [database, id, workshop]);

  return { workshop: workshop as any as WorkshopDocument, isFetching };
}
