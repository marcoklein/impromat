import { useMemo } from "react";
import { ReplicationStateEnum } from "./collections/replication-state";
import { useReplicationStateOfCollection } from "./use-replication-state-of-collection";

/**
 * Returns the replication state of all collections.
 */
export function useReplicationState() {
  const elementsReplication = useReplicationStateOfCollection("elements");
  const sectionsReplication = useReplicationStateOfCollection("sections");
  const usersReplication = useReplicationStateOfCollection("users");
  const workshopsReplication = useReplicationStateOfCollection("workshops");

  const state = useMemo(() => {
    const replicationStates = [
      elementsReplication,
      sectionsReplication,
      usersReplication,
      workshopsReplication,
    ];

    let resultState = ReplicationStateEnum.INITIALIZING;
    for (const stateKey in ReplicationStateEnum) {
      const enumState =
        ReplicationStateEnum[stateKey as keyof typeof ReplicationStateEnum];
      if (replicationStates.some((state) => state === enumState)) {
        resultState = enumState;
      }
    }
    return resultState;
  }, [
    elementsReplication,
    sectionsReplication,
    usersReplication,
    workshopsReplication,
  ]);

  return {
    state,
    elementsReplication,
    sectionsReplication,
    usersReplication,
    workshopsReplication,
  };
}
