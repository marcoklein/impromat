import { RxCollectionCreator } from "rxdb";
import {
  workshopMigrationStrategies,
  workshopSchemaVersion,
} from "./workshop-migrations";

const schema = {
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
      type: "array",
      items: {
        type: "object",
      },
    },
  },
  required: ["id", "version", "updatedAt", "name", "description", "sections"],
  type: "object",
} as const;

export const workshopCollection0: RxCollectionCreator<any> = {
  schema,
  migrationStrategies: workshopMigrationStrategies,
};
