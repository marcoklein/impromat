import { RxDatabase } from "rxdb";
import { ElementCollection } from "./collections/element/element-collection";
import { MeCollection } from "./collections/me/me-collection";
import { SectionCollection } from "./collections/section/section-collection";
import { UserCollection } from "./collections/user/user-collection";
import { WorkshopCollection } from "./collections/workshop/workshop-collection";

export type AppCollections = {
  workshops: WorkshopCollection;
  users: UserCollection;
  me: MeCollection;
  elements: ElementCollection;
  sections: SectionCollection;
};
export type AppDatabase = RxDatabase<AppCollections>;
