import { MigrationStrategies } from "rxdb";
import { v4 as uuidv4 } from "uuid";
import { rootLogger } from "../../../logger";

const logger = rootLogger.extend("migration");

export const workshopSchemaVersion = 1;
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
        id: uuidv4(),
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
        id: uuidv4(),
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
};
