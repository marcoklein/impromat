import { addRxPlugin, createRxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/dexie";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { getRxStorageMemory } from "rxdb/plugins/memory";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { GraphQLContextType } from "../graphql/graphql-context";
import { rootLogger } from "../logger";
import { addAppCollections } from "./collections/add-app-collections";
import { enableElementReplication } from "./collections/element/element-replication";
import { enableMeReplication } from "./collections/me/me-replication";
import { enableSectionReplication } from "./collections/section/section-replication";
import { enableUserReplication } from "./collections/user/user-replication";
import { enableWorkshopReplication } from "./collections/workshop/workshop-replication";
import { AppCollections, AppDatabase } from "./database-type";

addRxPlugin(RxDBReplicationGraphQLPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBMigrationPlugin);
if (process.env.NODE_ENV === "development") {
  addRxPlugin(RxDBDevModePlugin);
  addRxPlugin(RxDBJsonDumpPlugin);
  console.log("RxDB Development initialized");
}
console.log("RxDB Plugins initialized");

export const createDatabase = async (apiContext: GraphQLContextType) => {
  const logger = rootLogger.extend("create-database");
  const db: AppDatabase = await createRxDatabase<AppCollections>({
    name: "impromat-production",
    storage:
      process.env.NODE_ENV === "development"
        ? getRxStorageMemory()
        : getRxStorageDexie(),
  });

  const collections = await addAppCollections(db);
  enableWorkshopReplication(collections.workshops);
  enableMeReplication(collections.me, apiContext);
  enableUserReplication(collections.users);
  enableSectionReplication(collections.sections);
  enableElementReplication(collections.elements);

  db.$.subscribe((changeEvent) => {
    logger("Database Event: %O", changeEvent);
  });

  logger("initialized");
  return db;
};
