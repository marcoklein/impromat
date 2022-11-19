import { addRxPlugin, createRxDatabase, RxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/dexie";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { GraphQLContextType } from "../graphql/graphql-context";
import { rootLogger } from "../logger";
import { MeCollection, meCollection } from "./collections/me-collection";
import { enableMeReplication } from "./collections/me-replication";
import { UserCollection, userCollection } from "./collections/user-collection";
import { enableUserReplication } from "./collections/user-replication";
import {
  createWorkshopCollection,
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
  users: UserCollection;
  me: MeCollection;
};
export type ImpromatRxDatabase = RxDatabase<ImpromatDatabaseCollections>;

export const initialize = async (apiContext: GraphQLContextType) => {
  const logger = rootLogger.extend("store-initialize");
  const db = await createRxDatabase<ImpromatRxDatabase>({
    name: "impromat-production",
    storage: getRxStorageDexie(),
  });

  const collections = await db.addCollections({
    workshops: createWorkshopCollection(),
    users: userCollection,
    me: meCollection,
  });
  enableWorkshopReplication(collections.workshops);
  enableMeReplication(collections.me, apiContext);
  enableUserReplication(collections.users);

  logger("initialized");
  return db;
};
