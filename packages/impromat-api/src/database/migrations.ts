export const migrations: Record<
  number,
  (params: { fromState: any; toVersion: number; fromVersion: number }) => any
> = {
  /**
   * Add updatedAt and extract basedOn of elements into own element.
   */
  5: ({ fromState }) => {
    const now = Date.now();
    for (let userId in fromState.workshopsOfUsers) {
      fromState.workshopsOfUsers[userId].forEach((entry: any) => {
        if (!entry.updatedAt) {
          entry.updatedAt = now;
        }
      });
    }
    for (let userId in fromState.elementsOfUsers) {
      const basedOnElements: any[] = [];
      fromState.elementsOfUsers[userId].forEach((entry: any) => {
        if (!entry.updatedAt) {
          entry.updatedAt = now;
        }
        if (entry.basedOn && typeof entry.basedOn === "object") {
          entry.basedOn.updatedAt = now;
          entry.basedOn.version = entry.basedOn.version ?? 0;
          const basedOnId = entry.basedOn.id;
          basedOnElements.push(entry.basedOn);
          delete entry.basedOn;
          entry.basedOn = basedOnId;
        }
      });
      fromState.elementsOfUsers[userId].push(...basedOnElements);
    }
    for (let userId in fromState.sectionsOfUsers) {
      fromState.sectionsOfUsers[userId].forEach((entry: any) => {
        if (!entry.updatedAt) {
          entry.updatedAt = now;
        }
      });
    }
    return fromState;
  },
  4: ({ fromState }) => {
    for (let userId in fromState.workshopsOfUsers) {
      fromState.workshopsOfUsers[userId].forEach((entry: any) => {
        if (!entry.version) {
          entry.version = 0;
        }
      });
    }
    for (let userId in fromState.elementsOfUsers) {
      fromState.elementsOfUsers[userId].forEach((entry: any) => {
        if (!entry.version) {
          entry.version = 0;
        }
      });
    }
    for (let userId in fromState.sectionsOfUsers) {
      fromState.sectionsOfUsers[userId].forEach((entry: any) => {
        if (!entry.version) {
          entry.version = 0;
        }
      });
    }
    return fromState;
  },
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
      });
    });
    return { version: toVersion, workshopsOfUsers: fromState };
  },
};
