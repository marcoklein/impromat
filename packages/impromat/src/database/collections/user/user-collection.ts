import { RxCollectionCreator } from "rxdb";
import { UserDocType, userSchema } from "./user-collection-types";

export const userCollection: RxCollectionCreator<UserDocType> = {
  schema: userSchema,
  migrationStrategies: {},
};
