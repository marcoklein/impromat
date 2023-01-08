import { useMemo } from "react";
import {
  ReplicationStateEnum,
  REPLICATION_STATE_MAP,
} from "./collections/replication-state";
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

    const {
      ERROR,
      NO_CONNECTION,
      WAIT_FOR_LEADER,
      INITIALIZING,
      SYNCING,
      SYNCED,
    } = ReplicationStateEnum;
    const replicationStatePrioList: Record<ReplicationStateEnum, unknown> = {
      ERROR,
      NO_CONNECTION,
      WAIT_FOR_LEADER,
      INITIALIZING,
      SYNCING,
      SYNCED,
    };
    for (const stateKey of Object.keys(replicationStatePrioList)) {
      const enumState =
        ReplicationStateEnum[stateKey as keyof typeof ReplicationStateEnum];
      if (replicationStates.some((state) => state === enumState)) {
        return enumState;
      }
    }
    return INITIALIZING;
  }, [
    elementsReplication,
    sectionsReplication,
    usersReplication,
    workshopsReplication,
  ]);

  return {
    state,
    stateColor: REPLICATION_STATE_MAP[state].color,
    elementsReplication,
    sectionsReplication,
    usersReplication,
    workshopsReplication,
  };
}
