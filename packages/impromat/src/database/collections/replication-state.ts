import { Debugger } from "debug";
import { RxReplicationState } from "rxdb/plugins/replication";
import { BehaviorSubject } from "rxjs";
import { replicationErrorLogger } from "./replication-error-logger";

export enum ReplicationStateEnum {
  ERROR = "ERROR",
  NO_CONNECTION = "NO_CONNECTION",
  WAIT_FOR_LEADER = "WAIT_FOR_LEADER",
  INITIALIZING = "INITIALIZING",
  SYNCING = "SYNCING",
  SYNCED = "SYNCED",
}

// TODO refactor into interfaces to avoid additional mapping of the state
export const REPLICATION_STATE_MAP: Record<
  ReplicationStateEnum,
  { color: string }
> = {
  [ReplicationStateEnum.ERROR]: { color: "danger" },
  [ReplicationStateEnum.NO_CONNECTION]: { color: "warning" },
  [ReplicationStateEnum.WAIT_FOR_LEADER]: { color: "warning" },
  [ReplicationStateEnum.INITIALIZING]: { color: "primary" },
  [ReplicationStateEnum.SYNCING]: { color: "success" },
  [ReplicationStateEnum.SYNCED]: { color: "success" },
};

export class ReplicationState {
  state$ = new BehaviorSubject<ReplicationStateEnum>(
    ReplicationStateEnum.INITIALIZING,
  );
  logger: Debugger;

  constructor(
    public rxReplicationState: RxReplicationState<any, any>,
    logger: Debugger,
  ) {
    this.logger = logger.extend("ReplicationState");
    rxReplicationState.error$.subscribe((error) => {
      if (
        error.parameters.errors?.find((error) =>
          error.message.includes("NetworkError"),
        ) ||
        error.parameters.errors?.find((error) =>
          error.message.includes("Failed to fetch"),
        )
      ) {
        this.state$.next(ReplicationStateEnum.NO_CONNECTION);
      } else {
        this.state$.next(ReplicationStateEnum.ERROR);
      }
      replicationErrorLogger(error, logger);
    });
  }

  start(timeout = 1000) {
    const rxReplicationState = this.rxReplicationState;
    const logger = this.logger;

    const runSync = () => {
      logger("Syncing");
      if (!rxReplicationState.collection.database.isLeader()) {
        logger("Not leader, skipping replication and retrying in 10 seconds");
        this.state$.next(ReplicationStateEnum.WAIT_FOR_LEADER);
        // this.start(10 * 1000);
        return;
      }

      this.state$.next(ReplicationStateEnum.SYNCING);

      rxReplicationState.reSync();
      this.start(10 * 1000);
      logger("Awaiting in sync");
      rxReplicationState
        .awaitInSync()
        .then(() => {
          logger("Synced");
          this.state$.next(ReplicationStateEnum.SYNCED);
        })
        .catch((error) => {
          logger("Sync error %O", error);
        })
        .finally(() => {
          // this.start(10 * 1000);
        });
    };

    setTimeout(() => {
      logger("Triggering sync");
      runSync();
    }, timeout);
  }
}
