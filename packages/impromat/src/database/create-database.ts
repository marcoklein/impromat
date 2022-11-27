import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/dexie";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { GraphQLContextType } from "../graphql/graphql-context";
import { rootLogger } from "../logger";
import { enableElementReplication } from "./collections/element/element-replication";
import { enableMeReplication } from "./collections/me/me-replication";
import { enableSectionReplication } from "./collections/section/section-replication";
import { enableUserReplication } from "./collections/user/user-replication";
import { enableWorkshopReplication } from "./collections/workshop/workshop-replication";
import { AppDatabase } from "./database-type";
import { DatabaseProvider } from "./provider/database-provider";
import { Dexie } from "dexie";

addRxPlugin(RxDBReplicationGraphQLPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBJsonDumpPlugin);
if (process.env.NODE_ENV === "development") {
  addRxPlugin(RxDBDevModePlugin);
  console.log("RxDB Development initialized");
}
console.log("RxDB Plugins initialized");

export const createDatabase = async (apiContext: GraphQLContextType) => {
  const logger = rootLogger.extend("create-database");
  const storage = getRxStorageDexie();

  const dbNames = await Dexie.getDatabaseNames();
  logger("Db names: %O", dbNames);

  const provider = new DatabaseProvider(storage, {
    getVersion() {
      const version = window.localStorage.getItem("impromat-database-version");
      if (version) {
        return Number(version);
      }
      return 0;
    },
    setVersion(version) {
      window.localStorage.setItem("impromat-database-version", `${version}`);
    },
    isDatabaseExisting() {
      const existing = !!dbNames.find((name) =>
        /impromat-production/.test(name),
      );
      logger("db existing?", existing);
      return existing;
    },
  });
  const db: AppDatabase = await provider.loadDatabase();
  const collections = db.collections;
  enableWorkshopReplication(collections.workshops);
  enableMeReplication(collections.me, apiContext);
  enableUserReplication(collections.users);
  enableSectionReplication(collections.sections);
  enableElementReplication(collections.elements);

  db.$.subscribe((changeEvent) => {
    logger("Database Event: %O", changeEvent);
  });

  logger("initialized with collections %O", collections);
  return db;
};
