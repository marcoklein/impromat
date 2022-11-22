import { MigrationStrategies } from "rxdb";
import { rootLogger } from "../../../logger";
import { WORKSHOP_HELPER } from "../../workshop-helper";
const logger = rootLogger.extend("migration");

export const workshopSchemaVersion = 2;
export const workshopMigrationStrategies: MigrationStrategies = {
  1: (oldWorkshop) => {
    logger("Running migration 1");
    logger("Old workshop: %O", oldWorkshop);
    const elements = oldWorkshop.elements;
    oldWorkshop.elements = undefined;
    delete oldWorkshop.elements;
    oldWorkshop.sections = [];

    function pushSection(workshop: any, inputSection: any) {
      const defaultSection: any = {
        id: WORKSHOP_HELPER.generateUniqueId(),
        elements: [],
        name: "Unnamed",
        isVisible: true,
      };
      const section: any = {
        ...defaultSection,
        ...inputSection,
      };
      workshop.sections.push(section);
    }

    function pushElement(workshop: any, inputElement: any) {
      if (workshop.sections.length === 0) {
        pushSection(workshop, { isVisible: false });
      }
      const defaultElement: any = {
        id: WORKSHOP_HELPER.generateUniqueId(),
        name: "Unnamed",
        markdown: "",
        note: "",
        tags: [],
      };
      const element = {
        ...defaultElement,
        ...inputElement,
      };
      const lastSection = workshop.sections[workshop.sections.length - 1];
      lastSection.elements.push(element);
    }

    for (const element of elements) {
      pushElement(oldWorkshop, element);
    }

    logger("New workshop: %O", oldWorkshop);
    return oldWorkshop;
  },
  2: (oldWorkshop) => {
    logger("workshop - Running migration 1");
    logger("workshop - Old Workshop %O", oldWorkshop);
    oldWorkshop.sections = oldWorkshop.sections.map(({ id }: any) => id);
    logger("workshop - New Workshop: %O", oldWorkshop);
    return oldWorkshop;
  },
};
