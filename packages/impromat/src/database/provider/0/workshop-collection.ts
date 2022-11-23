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
    updatedAt: {},
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    sections: {
      type: "array",
    },
  },
  required: ["id"],
  type: "object",
} as const;

export const workshopCollection0: RxCollectionCreator<any> = {
  schema,
  migrationStrategies: workshopMigrationStrategies,
};
