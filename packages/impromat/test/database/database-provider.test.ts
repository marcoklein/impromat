import { expect, test } from "@playwright/test";
import { existsSync, readFileSync, removeSync, writeFileSync } from "fs-extra";
import { createRxDatabase, RxCollection, RxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/memory";
import {
  DatabaseProvider,
  DatabaseVersionProvider,
  DATABASE_VERSION,
} from "../../src/database/provider/database-provider";
import { workshopSchemaVersion0 } from "./initial-schema-version";
import { initRxDbPlugins } from "./rx-db-init";

test.describe("Database Provider", () => {
  test.beforeAll(() => {
    initRxDbPlugins();
  });

  test("should create database version names", async () => {
    // given
    const databaseProvider = new DatabaseProvider({} as any, {} as any);

    // when
    const version0 = databaseProvider.getDatabaseNameForVersion(0);
    const version1 = databaseProvider.getDatabaseNameForVersion(1);
    const version2 = databaseProvider.getDatabaseNameForVersion(2);

    // then
    expect(version0).toBe("impromat-production");
    expect(version1).toBe("impromat-production-1");
    expect(version2).toBe("impromat-production-2");
  });

  test("should create database migration for database version 0", async () => {
    // given
    let setDatabaseVersion = 0;
    let storage = getRxStorageMemory();
    const versionProvider: DatabaseVersionProvider = {
      getVersion() {
        return 0;
      },
      setVersion(version) {
        setDatabaseVersion = version;
      },
      isDatabaseExisting() {
        return true;
      },
    };
    class DatabaseProviderSpy extends DatabaseProvider {
      async createDatabaseOfVersion(
        version: number,
        options?: { ignoreDuplicate: boolean } | undefined,
      ): Promise<
        RxDatabase<{ [key: string]: RxCollection<any, {}, {}, {}> }, any, any>
      > {
        return super.createDatabaseOfVersion(version, {
          ignoreDuplicate: true,
        });
      }
    }
    const databaseProvider = new DatabaseProviderSpy(storage, versionProvider);

    const version0Data = JSON.parse(
      readFileSync("test/database/inputs/db_input_version_0.json").toString(),
    );
    const outPath =
      "test/database/outputs/db_output_complete_migration.gen.json";
    if (existsSync(outPath)) removeSync(outPath);
    const db = await createRxDatabase({
      name: "impromat-production",
      storage: storage,
    });
    await db.addCollections({
      workshops: {
        schema: workshopSchemaVersion0,
      },
    });
    await db.importJSON(version0Data);

    // when
    const newDb = await databaseProvider.loadDatabase();

    // then
    const dump = await newDb.exportJSON();
    expect(dump).toBeDefined();
    writeFileSync(outPath, JSON.stringify(dump, undefined, 2));
    expect(setDatabaseVersion).toBe(DATABASE_VERSION);
  });
});
