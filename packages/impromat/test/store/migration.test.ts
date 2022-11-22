import { expect, test } from "@playwright/test";
import { existsSync, readFileSync, removeSync, writeFileSync } from "fs-extra";
import { addRxPlugin, createRxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { getRxStorageMemory } from "rxdb/plugins/memory";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql";
import { addAppCollections } from "../../src/database/collections/add-app-collections";
import { AppDatabase } from "../../src/database/database-type";
import { workshopSchemaVersion0 } from "./schema_version_0";

addRxPlugin(RxDBReplicationGraphQLPlugin);
addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBJsonDumpPlugin);

test.describe("Database Migrations", () => {
  test("database migrations", async () => {
    // given
    const version0Data = JSON.parse(
      readFileSync("test/assets/db_dump_version_0.json").toString(),
    );
    const outPath = "test/assets/current_database_dump_after_migration.json";
    if (existsSync(outPath)) removeSync(outPath);
    const storage = getRxStorageMemory();
    const db = await createRxDatabase({
      name: "impromat-test",
      storage,
    });
    await db.addCollections({
      workshops: {
        schema: workshopSchemaVersion0,
      },
    });
    await db.importJSON(version0Data);

    // when
    const newDb = await createRxDatabase<AppDatabase>({
      name: "impromat-test",
      storage,
      ignoreDuplicate: true,
    });
    // await newDb.addCollections({
    //   workshops: workshopCollection,
    // });
    await addAppCollections(newDb);

    // await newDb.addCollections({
    //   users: userCollection,
    // });
    // await db.addCollections({
    //   me: meCollection,
    // });
    // await db.addCollections({
    //   elements: elementCollection,
    // });
    // await db.addCollections({
    //   sections: sectionCollection,
    // });

    // then
    const dump = await newDb.exportJSON();
    expect(dump).toBeDefined();
    writeFileSync(outPath, JSON.stringify(dump, undefined, 2));
  });
});
