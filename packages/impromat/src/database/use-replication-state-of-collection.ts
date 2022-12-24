import { useContext, useEffect, useState } from "react";
import { ReplicationStateEnum } from "./collections/replication-state";
import { ReplicationsState } from "./collections/replications-state";
import { ReplicationsContext } from "./replications-context";

export function useReplicationStateOfCollection(
  collectionName: keyof ReplicationsState,
) {
  const { replicationsState } = useContext(ReplicationsContext);
  const [replicationState, setReplicationState] =
    useState<ReplicationStateEnum>();
  useEffect(() => {
    if (replicationsState) {
      const subscription = replicationsState[collectionName].state$.subscribe(
        (state) => {
          setReplicationState(state);
        },
      );
      return () => subscription.unsubscribe();
    }
    setReplicationState(undefined);
  }, [collectionName, replicationsState]);
  return replicationState;
}
