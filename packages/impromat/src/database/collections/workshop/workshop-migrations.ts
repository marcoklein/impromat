import { MigrationStrategies } from "rxdb";
import { rootLogger } from "../../../logger";
import { WORKSHOP_HELPER } from "../../workshop-helper";
const logger = rootLogger.extend("migration");

export const workshopSchemaVersion = 0;
export const workshopMigrationStrategies: MigrationStrategies = {
  // 2: (oldWorkshop) => {
  //   logger("workshop - Running migration 1");
  //   logger("workshop - Old Workshop %O", oldWorkshop);
  //   oldWorkshop.sections = oldWorkshop.sections.map(({ id }: any) => id);
  //   logger("workshop - New Workshop: %O", oldWorkshop);
  //   return oldWorkshop;
  // },
};
