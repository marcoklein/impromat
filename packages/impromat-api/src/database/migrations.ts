import { WORKSHOP_HELPER } from "./workshop-helper";

export const migrations: Record<
  number,
  (params: { fromState: any; toVersion: number; fromVersion: number }) => any
> = {
  /**
   * Split workshops, elements, and sections
   *
   */
  3: ({ fromState, toVersion }) => {
    const newState = fromState;
    const workshopCollection = fromState.workshopsOfUsers;
    newState.elementsOfUsers = {};
    newState.sectionsOfUsers = {};
    for (let userId in workshopCollection) {
      newState.elementsOfUsers[userId] = [];
      newState.sectionsOfUsers[userId] = [];

      const sections: any[] = [];
      const elements: any[] = [];
      const workshops: any[] = [];
      workshopCollection[userId].forEach((workshop: any) => {
        workshop.sections = workshop.sections ?? [];
        workshop.sections.forEach((section: any) => {
          section.elements = section.elements ?? [];
          section.elements.forEach((element: any) => {
            newState.elementsOfUsers[userId].push(element);
          });
          section.elements = section.elements.map(({ id }: any) => id);
          newState.sectionsOfUsers[userId].push(section);
        });
        workshop.sections = workshop.sections.map(({ id }: any) => id);
        workshops.push(workshop);
      });
      workshopCollection[userId] = workshops;
    }
    newState.users = {};
    newState.version = toVersion;
    return newState;
  },
  /**
   * Add users information.
   */
  2: ({ fromState, toVersion }) => {
    return {
      ...fromState,
      ...{
        version: toVersion,
        users: {},
      },
    };
  },
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
