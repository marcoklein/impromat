import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql";

let loaded: Boolean = false;
export function initRxDbPlugins() {
  if (loaded) {
    return;
  }
  loaded = true;
  addRxPlugin(RxDBReplicationGraphQLPlugin);
  addRxPlugin(RxDBMigrationPlugin);
  addRxPlugin(RxDBDevModePlugin);
  addRxPlugin(RxDBJsonDumpPlugin);
}
