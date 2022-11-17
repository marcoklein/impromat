import fs from "node:fs";
import path from "node:path";
import { environment } from "../environment";
import { Workshop } from "../graphql/schema.gen";
import { SchemaValidator } from "../schema-validation/schema-validator";
import { Database } from "./database";
import { DatabaseUser } from "./database-user";
import { migrations } from "./migrations";

interface ValidationError {
  location: string;
  data: any;
}

export const DATABASE_VERSION = 2;

export interface DatabaseSchema {
  version: number;
  workshopsOfUsers: Record<string, Workshop[]>;
  users: Record<string, DatabaseUser>;
}

export class FileDatabase implements Database {
  store: DatabaseSchema | undefined;

  constructor(
    private storagePath: string = environment.STORAGE_PATH,
    private schemaValidator: SchemaValidator
  ) {}

  addWorkshop(userId: string, workshop: any) {
    if (!this.store) throw new Error("Not loaded");
    this.store.workshopsOfUsers[userId].push(workshop);
    this.save();
  }

  setWorkshops(userId: string, workshops: any[]) {
    if (!this.store) throw new Error("Not loaded");
    this.store.workshopsOfUsers[userId] = workshops;
    this.save();
  }

  async load() {
    if (fs.existsSync(path.join(this.storagePath, "db.json"))) {
      try {
        const dbLoad = JSON.parse(
          fs.readFileSync(path.join(this.storagePath, "db.json")).toString()
        );
        console.log("DbLoad", dbLoad);
        this.store = this.loadWithMigrationVerification(dbLoad);
        console.log("Loaded existing database", this.store);
      } catch (e) {
        console.error("Error while trying to load database:", e);
        if (e instanceof Error) {
          if (e.name === "SyntaxError") {
            throw new Error(
              "The database file is corrupted. Please use a backup version."
            );
          }
        }
        throw e;
      }
    } else {
      console.log("Creating a new database.");
      this.store = {
        version: DATABASE_VERSION,
        workshopsOfUsers: {},
        users: {},
      };
    }
    const errors = await this.validate();
    if (errors.errors) {
      this.store = undefined;
      console.error(
        `Database schema invalid. Errors: ${JSON.stringify(
          errors,
          undefined,
          2
        )}`
      );
      throw new Error(
        `Database is invalid for current schema. Please migrate changes by increasing the version. Errors: ${JSON.stringify(
          errors,
          undefined,
          2
        )}`
      );
    }
    this.save();
  }

  private loadWithMigrationVerification(fromState: any) {
    const fromVersion = fromState.version ?? 0;
    if (fromVersion < DATABASE_VERSION) {
      return this.migrate(fromState, fromVersion);
    } else if (fromVersion === DATABASE_VERSION) {
      return fromState;
    }
    throw new Error(
      `Database version has higher version (${fromVersion}) than the database of the current application (${DATABASE_VERSION}). Downgrading is not possible.`
    );
  }
  private migrate(fromState: any, fromVersion: number) {
    for (
      let migrationNumber = fromVersion + 1;
      migrationNumber <= DATABASE_VERSION;
      migrationNumber++
    ) {
      console.log(`Applying migration ${migrationNumber}`);
      fromState = migrations[migrationNumber]({
        fromState,
        fromVersion: migrationNumber - 1,
        toVersion: migrationNumber,
      });
      fromState.version = migrationNumber;
    }
    return fromState;
  }

  save() {
    if (!this.store) throw new Error("Not loaded");
    fs.writeFileSync(
      path.join(this.storagePath, "db.json"),
      JSON.stringify(this.store)
    );
  }

  async validate(): Promise<{
    valid: boolean;
    errors?: ValidationError[] | undefined;
  }> {
    if (!this.store) throw new Error("Not loaded");
    let errors: ValidationError[] = [];
    for (const workshops of Object.values(this.store.workshopsOfUsers)) {
      for (const workshop of workshops) {
        const result = await this.schemaValidator.validate(workshop);
        if (result.errors) {
          errors.push(
            ...result.errors.map(
              (error): ValidationError => ({
                location: `Workshopid${workshop.id}`,
                data: error,
              })
            )
          );
        }
      }
    }
    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  getVersion() {
    if (!this.store) throw new Error("Not loaded");
    return this.store.version;
  }

  getWorkshops(userId: string) {
    if (!this.store) throw new Error("Not loaded");
    return this.store.workshopsOfUsers[userId] ?? [];
  }

  getWorkshop(userId: string, workshopId: string) {
    const workshops = this.getWorkshops(userId);
    const workshop = workshops.find((workshop) => workshop.id === workshopId);
    return workshop;
  }

  setUser(userId: string, user: DatabaseUser) {
    if (!this.store) throw new Error("Not loaded");
    this.store.users[userId] = user;
    this.save();
  }

  getUser(userId: string): DatabaseUser {
    if (!this.store) throw new Error("Not loaded");
    return this.store.users[userId] ?? {};
  }
}
