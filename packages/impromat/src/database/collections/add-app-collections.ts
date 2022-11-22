import { AppDatabase } from "../database-type";
import { elementCollection } from "./element/element-collection";
import { meCollection } from "./me/me-collection";
import { sectionCollection } from "./section/section-collection";
import { userCollection } from "./user/user-collection";
import { workshopCollection } from "./workshop/workshop-collection";

export async function addAppCollections(db: AppDatabase) {
  await db.addCollections({
    workshops: workshopCollection,
    users: userCollection,
    me: meCollection,
    elements: elementCollection,
    sections: sectionCollection,
  });
  return db.collections;
}
