import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import { meMigrationStrategies, meSchemaVersion } from "./migration-strategies";

const schemaLiteral = {
  primaryKey: "id",
  version: meSchemaVersion,
  properties: {
    id: {
      type: "string",
      maxLength: 50,
    },
    version: {
      type: "number",
    },
    user: {
      type: "string",
      ref: "Element",
    },
  },
  required: ["id", "version", "user"],
  type: "object",
} as const;

export const meCollectionSchema = toTypedRxJsonSchema(schemaLiteral);
export type MeDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof meCollectionSchema
>;
export const meSchema: RxJsonSchema<MeDocType> = schemaLiteral;
export type MeCollection = RxCollection<MeDocType>;

export const meCollection: RxCollectionCreator<MeDocType> = {
  schema: meSchema,
  migrationStrategies: meMigrationStrategies,
};
