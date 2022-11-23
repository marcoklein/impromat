import { expect, test } from "@playwright/test";
import { existsSync, readFileSync, removeSync, writeFileSync } from "fs-extra";
import { createRxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/memory";
import { DatabaseProvider } from "../../src/database/provider/database-provider";
import { DatabaseProviderMock } from "./database-provider-mock";
import { workshopSchemaVersion0 } from "./initial-schema-version";
import { initRxDbPlugins } from "./rx-db-init";

test.describe("Database Provider", () => {
  test.beforeAll(() => {
    initRxDbPlugins();
  });

  let storage = getRxStorageMemory();
  let databaseProvider: DatabaseProvider;
  test.beforeEach(() => {
    storage = getRxStorageMemory();
    databaseProvider = new DatabaseProviderMock(storage, {} as any);
  });

  test("should create database migration for database version 0", async () => {
    // given
    const version0Data = JSON.parse(
      readFileSync("test/database/inputs/db_input_version_0.json").toString(),
    );
    const outPath = "test/database/outputs/db_output_version_0.gen.json";
    if (existsSync(outPath)) removeSync(outPath);
    const db = await createRxDatabase({
      name: "impromat-production",
      storage: storage,
      ignoreDuplicate: true,
    });
    await db.addCollections({
      workshops: {
        schema: workshopSchemaVersion0,
      },
    });

    await db.importJSON(version0Data);

    // when
    const newDb = await databaseProvider.createDatabaseOfVersion(0, {
      ignoreDuplicate: true,
    });

    // then
    const dump = await newDb.exportJSON();
    expect(dump).toBeDefined();
    writeFileSync(outPath, JSON.stringify(dump, undefined, 2));
  });

  test("should create database migration for database version 1", async () => {
    // given
    const version0Data = JSON.parse(
      readFileSync("test/database/inputs/db_input_version_1.json").toString(),
    );
    const outPath = "test/database/outputs/db_output_version_1.gen.json";
    if (existsSync(outPath)) removeSync(outPath);
    const db = await databaseProvider.createDatabaseOfVersion(0, {
      ignoreDuplicate: true,
    });
    await db.importJSON(version0Data);

    // when
    const newDb = await databaseProvider.applyNextMigrationToDatabase(0, db);

    // then
    const dump = await newDb.exportJSON();
    expect(dump).toBeDefined();
    writeFileSync(outPath, JSON.stringify(dump, undefined, 2));
  });
});
