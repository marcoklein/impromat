import { MigrationStrategies } from "rxdb";
import { rootLogger } from "../../logger";
import { WORKSHOP_HELPER } from "../workshop-helper";
const logger = rootLogger.extend("migration");

export const migrationStrategies: MigrationStrategies = {
  1: (oldWorkshop) => {
    // TODO investigate how this could use the same migration function as file-database on server
    logger("Running migration 1");
    logger("Old workshop: %O", oldWorkshop);
    const elements = oldWorkshop.elements;
    oldWorkshop.elements = undefined;
    delete oldWorkshop.elements;
    oldWorkshop.sections = [];
    WORKSHOP_HELPER.pushElements(oldWorkshop, elements);
    logger("New workshop: %O", oldWorkshop);
    return oldWorkshop;
  },
};
