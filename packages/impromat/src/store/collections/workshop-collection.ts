import { RxCollection } from "rxdb";
import { ImpromatRxDatabase } from "../initialize";
import { WorkshopSchemaJson } from "../schema-json.gen";
import { Workshop } from "../schema.gen";
import { migrationStrategies } from "./migration-strategies";

export type WorkshopCollection = RxCollection<Workshop>;

export async function addWorkshopCollectionToDatabase(
  db: ImpromatRxDatabase,
): Promise<WorkshopCollection> {
  const workshopProperties = WorkshopSchemaJson.properties;
  // @ts-ignore
  delete workshopProperties.deleted;

  const collection = await db.addCollections({
    workshops: {
      // TODO define a conflict resolution
      // conflictHandler: (input) => {
      //   console.log("### CONFLICT", JSON.stringify(input, undefined, 2));
      //   return input.realMasterState;
      // },
      // schema: workshopSchemaVersion0,
      schema: {
        primaryKey: "id",
        properties: {
          ...workshopProperties,
          id: { type: "string", maxLength: 50 },
          sections: { type: "array" },
        },
        version: 1,
        type: "object",
      },
      migrationStrategies,
    },
  });

  return collection.workshops;
}
