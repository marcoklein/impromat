import {
  createRxDatabase,
  RxCollectionCreator,
  RxDatabase,
  RxStorage,
} from "rxdb";
import { rootLogger } from "../../logger";
import { elementCollection } from "../collections/element/element-collection";
import { meCollection } from "../collections/me/me-collection";
import { sectionCollection } from "../collections/section/section-collection";
import { userCollection } from "../collections/user/user-collection";
import { workshopCollection } from "../collections/workshop/workshop-collection";
import { workshopCollection0 } from "./0/workshop-collection";
const logger = rootLogger.extend("database-migrator");

export interface DatabaseVersionProvider {
  setVersion(version: number): void;
  getVersion(): number | undefined;
  isDatabaseExisting(): boolean;
}

export const DATABASE_VERSION = 1;

type DatabaseCollections = Record<string, RxCollectionCreator>;

export const DATABASE_VERSION_COLLECIONS: Record<number, DatabaseCollections> =
  {
    1: {
      workshops: workshopCollection,
      users: userCollection,
      me: meCollection,
      elements: elementCollection,
      sections: sectionCollection,
    },
    0: {
      workshops: workshopCollection0,
    },
  };

const databaseMigrations: Record<
  number,
  (oldDb: RxDatabase<any>, newDb: RxDatabase<any>) => Promise<void> | void
> = {
  1: async (oldDb: RxDatabase, newDb: RxDatabase) => {
    const json = JSON.parse(JSON.stringify(await oldDb.exportJSON()));
    const workshopCollection = json.collections[0];
    if (workshopCollection.name !== "workshops") {
      throw new Error("Error during migration. There exist other collections.");
    }
    const sections: any[] = [];
    const elements: any[] = [];
    const workshops: any[] = [];
    workshopCollection.docs.forEach((workshop: any) => {
      workshop.sections = workshop.sections ?? [];
      workshop.sections.forEach((section: any) => {
        section.elements = section.elements ?? [];
        section.elements.forEach((element: any) => {
          elements.push(element);
        });
        section.elements = section.elements.map(({ id }: any) => id);
        sections.push(section);
      });
      workshop.sections = workshop.sections.map(({ id }: any) => id);
      workshops.push(workshop);
    });
    newDb.collections.workshops.bulkUpsert(workshops);
    newDb.collections.elements.bulkUpsert(elements);
    newDb.collections.sections.bulkUpsert(sections);
  },
};

export class DatabaseProvider {
  constructor(
    protected storage: RxStorage<any, any>,
    protected databaseVersionProvider: DatabaseVersionProvider,
  ) {}

  async loadDatabase<T extends RxDatabase<any>>(): Promise<T> {
    const currentVersion = this.databaseVersionProvider.getVersion();
    logger(
      "Current database version = %i; should database version = %i",
      currentVersion,
      DATABASE_VERSION,
    );
    if (
      this.databaseVersionProvider.isDatabaseExisting() &&
      currentVersion !== undefined &&
      currentVersion !== DATABASE_VERSION
    ) {
      logger(
        "Creating old database with version %i for migration",
        currentVersion,
      );
      let oldDatabase = await this.createDatabaseOfVersion(currentVersion);
      for (
        let version = currentVersion;
        version < DATABASE_VERSION;
        version++
      ) {
        oldDatabase = await this.applyNextMigrationToDatabase(
          version,
          oldDatabase,
        );
      }
      this.databaseVersionProvider.setVersion(DATABASE_VERSION);
      return oldDatabase as T;
    }
    logger(
      "Returning database with most recent version (%i)",
      DATABASE_VERSION,
    );
    const db = await this.createDatabaseOfVersion(DATABASE_VERSION);
    return db as T;
  }

  async applyNextMigrationToDatabase(version: number, oldDatabase: RxDatabase) {
    const newVersion = version + 1;
    logger("Creating database with version %i for migration", version);
    const nextDatabase = await this.createDatabaseOfVersion(newVersion);
    await databaseMigrations[newVersion](oldDatabase, nextDatabase);
    return nextDatabase;
  }

  async createDatabaseOfVersion(
    version: number,
    options?: { ignoreDuplicate: boolean },
  ) {
    const db = await createRxDatabase({
      name: this.getDatabaseNameForVersion(version),
      storage: this.storage,
      ignoreDuplicate: options?.ignoreDuplicate,
    });
    const collections =
      DATABASE_VERSION_COLLECIONS[
        version as keyof typeof DATABASE_VERSION_COLLECIONS
      ];
    await db.addCollections(collections);
    return db;
  }

  getDatabaseNameForVersion(version: number) {
    if (version === 0) {
      return "impromat-production";
    }
    return `impromat-production-${version}`;
  }
}
