import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import {
  workshopMigrationStrategies,
  workshopSchemaVersion,
} from "./migration-strategies";

const schemaLiteral = {
  primaryKey: "id",
  version: workshopSchemaVersion,
  properties: {
    id: {
      type: "string",
      maxLength: 50,
    },
    version: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    sections: {
      ref: "sections",
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["id", "version", "updatedAt", "name", "description", "sections"],
  type: "object",
} as const;

export const workshopCollectionSchema = toTypedRxJsonSchema(schemaLiteral);
export type WorkshopDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof workshopCollectionSchema
>;
export type WorkshopCollection = RxCollection<WorkshopDocType>;
export const workshopSchema: RxJsonSchema<WorkshopDocType> = schemaLiteral;

export const workshopCollection: RxCollectionCreator<WorkshopDocType> = {
  schema: workshopSchema,
  migrationStrategies: workshopMigrationStrategies,
};
