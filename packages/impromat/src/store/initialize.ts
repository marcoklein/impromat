import { addRxPlugin, createRxDatabase, RxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/dexie";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import {
  addWorkshopCollectionToDatabase,
  WorkshopCollection,
} from "./collections/workshop-collection";
import { enableWorkshopReplication } from "./collections/workshop-replication";

addRxPlugin(RxDBReplicationGraphQLPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBMigrationPlugin);
if (process.env.NODE_ENV === "development") {
  addRxPlugin(RxDBDevModePlugin);
  addRxPlugin(RxDBJsonDumpPlugin);
  console.log("RxDB Development initialized");
}
console.log("RxDB Plugins initialized");

export type ImpromatDatabaseCollections = {
  workshops: WorkshopCollection;
};
export type ImpromatRxDatabase = RxDatabase<ImpromatDatabaseCollections>;

export const initialize = async () => {
  const db = await createRxDatabase<ImpromatRxDatabase>({
    name: "impromat-production",
    storage: getRxStorageDexie(),
  });
  const workshops = await addWorkshopCollectionToDatabase(db);
  enableWorkshopReplication(workshops);

  return db;
};
