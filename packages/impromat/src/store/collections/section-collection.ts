import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import {
  sectionSchemaVersion,
  sectionMigrationStrategies,
} from "./migration-strategies";

const schemaLiteral = {
  primaryKey: "id",
  version: sectionSchemaVersion,
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
      ref: "sections",
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

export const sectionCollectionSchema = toTypedRxJsonSchema(schemaLiteral);
export type SectionDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof sectionCollectionSchema
>;
export type SectionCollection = RxCollection<SectionDocType>;
export const sectionSchema: RxJsonSchema<SectionDocType> = schemaLiteral;

export const sectionCollection: RxCollectionCreator<SectionDocType> = {
  schema: sectionSchema,
  migrationStrategies: sectionMigrationStrategies,
};
