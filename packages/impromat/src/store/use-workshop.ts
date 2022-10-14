import { useEffect, useState } from "react";
import { useRxCollection } from "rxdb-hooks";
import { useLogger } from "../use-logger";
import { Workshop } from "./schema.gen";

export function useWorkshop(id: string) {
  const [workshop, setWorkshop] = useState<Workshop | undefined>();
  const logger = useLogger("useWorkshop");

  const collection = useRxCollection<Workshop>("workshops");
  useEffect(() => {
    if (!collection) {
      logger("Could not subscribe to stream as there is no collection set");
      return;
    }
    const subscription = collection
      .findOne({ selector: { id } })
      .$.subscribe((value) => {
        if (!value) {
          logger("Stream returned undefined workshop");
          setWorkshop(undefined);
          return;
        }
        const valueJson = value.toJSON() as Workshop;
        logger("Stream returned worskhop with id %s", value.id);
        setWorkshop(valueJson);
      });
    logger("Subscribed");
    return () => {
      logger("Unsubscribed from worshop stream");
      subscription.unsubscribe();
    };
  }, [logger, collection, id]);

  return { workshop, isFetching: !workshop };
}
