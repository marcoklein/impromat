import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxDocument,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import { ImpromatRxDatabase } from "../initialize";
import { ElementDocument } from "./element-collection";
import {
  sectionMigrationStrategies,
  sectionSchemaVersion,
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
    elements: {
      ref: "elements",
      type: "array",
      items: {
        type: "string",
      },
    },
    note: {
      type: "string",
    },
    color: {
      type: "string",
    },
    isVisible: {
      type: "boolean",
    },
    isCollapsed: {
      type: "boolean",
    },
  },
  required: ["id", "version", "name", "elements"],
  type: "object",
} as const;

export const sectionCollectionSchema = toTypedRxJsonSchema(schemaLiteral);
export type SectionDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof sectionCollectionSchema
>;
export type SectionDocumentMethods = {
  populateElements: () => Promise<ElementDocument[]>;
  getDatabase: () => ImpromatRxDatabase;
};
export type SectionDocument = RxDocument<
  SectionDocType,
  SectionDocumentMethods
>;
export type SectionCollection = RxCollection<SectionDocType>;
export const sectionSchema: RxJsonSchema<SectionDocType> = schemaLiteral;

const documentMethods: SectionDocumentMethods = {
  async populateElements(this: SectionDocument) {
    return await this.populate("elements");
  },
  getDatabase(this: RxDocument) {
    return this.collection.database as any as ImpromatRxDatabase;
  },
};

export const sectionCollection: RxCollectionCreator<SectionDocType> = {
  schema: sectionSchema,
  migrationStrategies: sectionMigrationStrategies,
  methods: documentMethods,
};
