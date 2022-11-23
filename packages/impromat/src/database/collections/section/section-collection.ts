import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxDocument,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import { AppDatabase } from "../../database-type";
import { ElementDocument } from "../element/element-collection";

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
  getDatabase: () => AppDatabase;
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
    return this.collection.database as any as AppDatabase;
  },
};

export const sectionCollection: RxCollectionCreator<SectionDocType> = {
  schema: sectionSchema,
  migrationStrategies: {},
  methods: documentMethods,
};
