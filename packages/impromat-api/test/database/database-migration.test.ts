import { expect } from "chai";
import { readFileSync, writeFileSync } from "fs";
import { copyFile, mkdir, rm } from "fs/promises";
import "mocha";
import { existsSync } from "node:fs";
import {
  DATABASE_VERSION,
  FileDatabase,
} from "../../src/database/file-database";

describe("Schema Migration", async () => {
  beforeEach(async () => {
    await rm(".cache/test/database", { force: true, recursive: true });
    await mkdir(".cache/test/database", { recursive: true });
  });

  it("should migrate database file from version 5", async () => {
    // given
    await mkdir(".cache/test/database", { recursive: true });
    await copyFile(
      "test/assets/test_db_v5.json",
      ".cache/test/database/db.json"
    );
    const database = new FileDatabase(".cache/test/database");
    // when
    await database.load();
    const content = JSON.parse(
      readFileSync(".cache/test/database/db.json").toString()
    );
    writeFileSync(
      "test/assets/test_db_v5_after_migration.gen.json",
      JSON.stringify(content, undefined, 2)
    );
    // then
    expect(database.getVersion()).to.equal(DATABASE_VERSION);
  });

  it("should not load database if database file is corrupted", async () => {
    // given
    await mkdir(".cache/test/database", { recursive: true });
    await copyFile(
      "test/assets/corrupted_db.json",
      ".cache/test/database/db.json"
    );
    const database = new FileDatabase(".cache/test/database");
    // when
    try {
      await database.load();
      expect.fail("Database must not load");
    } catch (e) {
      if (e instanceof Error) {
        // then
        expect(e.message).to.contain("is corrupted");
      } else {
        throw e;
      }
    }
  });

  it("should save database state on load", async () => {
    // given
    const database = new FileDatabase(".cache/test/database");
    // when
    await database.load();
    // then
    expect(database.getVersion() >= 0);
    expect(existsSync(".cache/test/database/db.json")).to.be.true;
  });
});
