import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxDocument,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import { AppDatabase } from "../../database-type";
import { SectionDocument } from "../section/section-collection";
import {
  workshopMigrationStrategies,
  workshopSchemaVersion,
} from "./workshop-migrations";

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
type ReferenceFields = {
  sections_: Promise<SectionDocument[]>;
};
export type WorkshopDocumentMethods = {
  populateSections: () => Promise<SectionDocument[]>;
  getDatabase: () => AppDatabase;
} & ReferenceFields;
export type WorkshopDocument = RxDocument<
  WorkshopDocType,
  WorkshopDocumentMethods
>;
export type WorkshopCollection = RxCollection<
  WorkshopDocType,
  WorkshopDocumentMethods
>;
export const workshopSchema: RxJsonSchema<WorkshopDocType> = schemaLiteral;

const documentMethods: Omit<WorkshopDocumentMethods, keyof ReferenceFields> = {
  async populateSections(this: WorkshopDocument) {
    return this.sections_;
  },
  getDatabase(this: RxDocument) {
    return this.collection.database as any as AppDatabase;
  },
};

export const workshopCollection: RxCollectionCreator<WorkshopDocType> = {
  schema: workshopCollectionSchema,
  migrationStrategies: workshopMigrationStrategies,
  methods: documentMethods,
};
