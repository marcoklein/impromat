import { MigrationStrategies } from "rxdb";

export const elementSchemaVersion = 1;
export const elementMigrationStrategies: MigrationStrategies = {
  /**
   * Marking markdown, note, tags as optional (non-required).
   */
  1: (oldDoc) => {
    return oldDoc;
  },
};
