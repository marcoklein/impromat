import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import {
  userMigrationStrategies,
  userSchemaVersion,
} from "./migration-strategies";

const userSchemaLiteral = {
  primaryKey: "id",
  version: userSchemaVersion,
  properties: {
    id: {
      type: "string",
      maxLength: 50,
    },
    version: {
      type: "number",
    },
    favoriteElements: {
      type: "array",
      ref: "Element",
      items: {
        type: "string",
      },
    },
  },
  required: ["id", "version", "favoriteElements"],
  type: "object",
} as const;

export const userCollectionSchema = toTypedRxJsonSchema(userSchemaLiteral);
export type UserDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof userCollectionSchema
>;
export type UserCollection = RxCollection<UserDocType>;
export const userSchema: RxJsonSchema<UserDocType> = userSchemaLiteral;

export const userCollection: RxCollectionCreator<UserDocType> = {
  schema: userSchema,
  migrationStrategies: userMigrationStrategies,
};
