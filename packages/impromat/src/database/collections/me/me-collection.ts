import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";

const schemaLiteral = {
  primaryKey: "id",
  version: 0,
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
      ref: "users",
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
  migrationStrategies: {},
};
