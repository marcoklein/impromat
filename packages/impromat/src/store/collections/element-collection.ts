import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxDocument,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import {
  elementSchemaVersion,
  elementMigrationStrategies,
} from "./migration-strategies";

const schemaLiteral = {
  primaryKey: "id",
  version: elementSchemaVersion,
  properties: {
    id: {
      type: "string",
      maxLength: 50,
    },
    version: {
      type: "number",
    },
    name: {
      type: "string",
    },
    markdown: {
      type: "string",
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
    },
    note: {
      type: "string",
    },
    basedOn: {
      ref: "elements",
      type: "string",
    },
    languageCode: {
      type: "string",
    },
    sourceUrl: {
      type: "string",
    },
    sourceName: {
      type: "string",
    },
    sourceBaseUrl: {
      type: "string",
    },
    licenseName: {
      type: "string",
    },
    licenseUrl: {
      type: "string",
    },
  },
  required: ["id", "version", "name", "markdown", "tags", "note"],
  type: "object",
} as const;

export const elementCollectionSchema = toTypedRxJsonSchema(schemaLiteral);
export type ElementDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof elementCollectionSchema
>;
export type ElementDocument = RxDocument<ElementDocType>;
export type ElementCollection = RxCollection<ElementDocType>;
export const elementSchema: RxJsonSchema<ElementDocType> = schemaLiteral;

export const elementCollection: RxCollectionCreator<ElementDocType> = {
  schema: elementSchema,
  migrationStrategies: elementMigrationStrategies,
};
