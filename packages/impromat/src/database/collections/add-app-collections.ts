import { AppDatabase } from "../database-type";
import {
  DATABASE_VERSION,
  DATABASE_VERSION_COLLECIONS,
} from "../provider/database-provider";

export async function addAppCollections(db: AppDatabase) {
  await db.addCollections(DATABASE_VERSION_COLLECIONS[DATABASE_VERSION]);
  return db.collections;
}
