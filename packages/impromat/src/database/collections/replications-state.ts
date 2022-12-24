import { ReplicationState } from "./replication-state";

export interface ReplicationsState {
  workshops: ReplicationState;
  users: ReplicationState;
  sections: ReplicationState;
  elements: ReplicationState;
}
