import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxCollectionCreator,
  RxDocument,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import { ImpromatRxDatabase } from "../initialize";
import {
  workshopMigrationStrategies,
  workshopSchemaVersion,
} from "./migration-strategies";
import { SectionDocType, SectionDocument } from "./section-collection";

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
  getDatabase: () => ImpromatRxDatabase;
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
    return this.collection.database as any as ImpromatRxDatabase;
  },
};

export const workshopCollection: RxCollectionCreator<WorkshopDocType> = {
  schema: workshopSchema,
  migrationStrategies: workshopMigrationStrategies,
  methods: documentMethods,
};
