import { RxCollection, RxCollectionCreator } from "rxdb";
import { WorkshopSchemaJson } from "../schema-json.gen";
import { Workshop } from "../schema.gen";
import {
  workshopMigrationStrategies,
  workshopSchemaVersion,
} from "./migration-strategies";

export type WorkshopCollection = RxCollection<Workshop>;

export function createWorkshopCollection(): RxCollectionCreator<Workshop> {
  const workshopProperties = WorkshopSchemaJson.properties;
  // @ts-ignore
  delete workshopProperties.deleted;
  return {
    schema: {
      primaryKey: "id",
      properties: {
        ...workshopProperties,
        id: { type: "string", maxLength: 50 },
        sections: { type: "array" },
      },
      version: workshopSchemaVersion,
      type: "object",
    },
    migrationStrategies: workshopMigrationStrategies,
  };
}
