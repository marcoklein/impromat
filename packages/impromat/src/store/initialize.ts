import { addRxPlugin, createRxDatabase, RxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/dexie";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { getRxStorageMemory } from "rxdb/plugins/memory";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { GraphQLContextType } from "../graphql/graphql-context";
import { rootLogger } from "../logger";
import {
  ElementCollection,
  elementCollection,
} from "./collections/element-collection";
import { enableElementReplication } from "./collections/element-replication";
import { MeCollection, meCollection } from "./collections/me-collection";
import { enableMeReplication } from "./collections/me-replication";
import {
  SectionCollection,
  sectionCollection,
} from "./collections/section-collection";
import { enableSectionReplication } from "./collections/section-replication";
import { UserCollection, userCollection } from "./collections/user-collection";
import { enableUserReplication } from "./collections/user-replication";
import {
  workshopCollection,
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
  elements: ElementCollection;
  sections: SectionCollection;
};
export type ImpromatRxDatabase = RxDatabase<ImpromatDatabaseCollections>;

export const initialize = async (apiContext: GraphQLContextType) => {
  const logger = rootLogger.extend("store-initialize");
  const db: ImpromatRxDatabase =
    await createRxDatabase<ImpromatDatabaseCollections>({
      name: "impromat-production",
      storage:
        process.env.NODE_ENV === "development"
          ? getRxStorageMemory()
          : getRxStorageDexie(),
    });

  const collections = await db.addCollections({
    workshops: workshopCollection,
    users: userCollection,
    me: meCollection,
    elements: elementCollection,
    sections: sectionCollection,
  });
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
