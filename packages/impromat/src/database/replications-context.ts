import { createContext } from "react";
import { ReplicationsState } from "./collections/replications-state";

export type ReplicationContextType = {
  replicationsState: ReplicationsState | undefined;
};

export const ReplicationsContext = createContext<ReplicationContextType>({
  replicationsState: undefined,
});
