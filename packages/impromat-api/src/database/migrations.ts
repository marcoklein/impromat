import { WORKSHOP_HELPER } from "./workshop-helper";

export const migrations: Record<
  number,
  (params: { fromState: any; toVersion: number; fromVersion: number }) => any
> = {
  /**
   * Add `type` to version and remove all null elements
   */
  1: ({ fromState, toVersion }) => {
    Object.values<any[]>(fromState).forEach((workshops) => {
      workshops.forEach((oldWorkshop) => {
        // TODO deduplicate: this is the same as frontend!
        // except for oldWorkshop.updatedAt
        const elements = oldWorkshop.elements;
        delete oldWorkshop.elements;
        // add elements into section
        oldWorkshop.sections = [];
        WORKSHOP_HELPER.pushElements(oldWorkshop, elements);
      });
    });
    return { version: toVersion, workshopsOfUsers: fromState };
  },
};
