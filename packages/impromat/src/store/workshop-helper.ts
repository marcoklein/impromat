import { v4 as uuidv4 } from "uuid";
import { rootLogger } from "../logger";
import {
  ElementDocType,
  ElementDocument,
} from "./collections/element-collection";
import { SectionDocType } from "./collections/section-collection";
import {
  WorkshopDocType,
  WorkshopDocument,
} from "./collections/workshop-collection";

/**
 * A replication push will increase the version by one and the initial version sent to the server has to be 0.
 */
export const DEFAULT_VERSION = 0;

const logger = rootLogger.extend("workshop-helper");

export class WorkshopHelper {
  async findElement(workshop: WorkshopDocument, workshopElementId: string) {
    for (const section of await workshop.populateSections()) {
      const elementIndexInSection = section.elements.findIndex(
        (element) => element === workshopElementId,
      );
      if (elementIndexInSection >= 0) {
        return {
          section,
          element: section.elements[elementIndexInSection],
          elementIndexInSection,
        };
      }
    }
    return undefined;
  }

  async findSection(workshop: WorkshopDocument, workshopSectionId: string) {
    const sectionIndexInWorkshop = (
      await workshop.populateSections()
    ).findIndex((section) => section.id === workshopSectionId);
    if (sectionIndexInWorkshop >= 0) {
      return {
        section: workshop.sections[sectionIndexInWorkshop],
        sectionIndexInWorkshop,
      };
    }
    return undefined;
  }

  async getElements(workshop: WorkshopDocument | undefined) {
    if (!workshop) return [];
    const elements: ElementDocument[] = [];
    for (const section of await workshop.populateSections()) {
      for (const element of await section.populateElements()) {
        elements.push(element);
      }
    }
    return elements;
  }

  async updateElement(
    workshop: WorkshopDocument,
    workshopElement: ElementDocType,
  ) {
    const result = await this.findElement(workshop, workshopElement.id);
    if (result && result.elementIndexInSection >= 0) {
      await workshop
        .getDatabase()
        .collections.elements.atomicUpsert(workshopElement);
      return true;
    }
    return false;
  }

  async updateSection(
    workshop: WorkshopDocument,
    workshopSection: SectionDocType,
  ) {
    const result = await this.findSection(workshop, workshopSection.id);
    if (result && result.sectionIndexInWorkshop >= 0) {
      await workshop
        .getDatabase()
        .collections.sections.atomicUpsert(workshopSection);
      return true;
    }
    return false;
  }

  async removeElement(
    workshop: WorkshopDocument,
    workshopElement: ElementDocType | string,
  ) {
    const workshopElementId =
      typeof workshopElement === "string"
        ? workshopElement
        : workshopElement.id;
    const result = await this.findElement(workshop, workshopElementId);

    if (result && result.elementIndexInSection >= 0) {
      await result.section.atomicUpdate((draft) => {
        draft.elements.splice(result.elementIndexInSection, 1);
        return draft;
      });
      return true;
    }
    return false;
  }

  async removeSection(
    workshop: WorkshopDocument,
    workshopSection: SectionDocType | string,
  ) {
    const workshopSectionId =
      typeof workshopSection === "string"
        ? workshopSection
        : workshopSection.id;
    const result = await this.findSection(workshop, workshopSectionId);

    if (result && result.sectionIndexInWorkshop >= 0) {
      await workshop.atomicUpdate((draft) => {
        draft.sections.splice(result.sectionIndexInWorkshop, 1);
        return draft;
      });
      return true;
    }
    return false;
  }

  async pushElement(
    workshop: WorkshopDocument,
    inputElement: Partial<ElementDocType>,
  ) {
    logger(
      "Pushing element into workshop. Workshop sections: %O",
      workshop.sections,
    );
    if (!workshop.sections.length) {
      await this.pushSection(workshop, { isVisible: false });
    }

    const defaultElement: ElementDocType = {
      id: this.generateUniqueId(),
      version: DEFAULT_VERSION,
      name: "Unnamed",
      markdown: "",
      note: "",
      tags: [],
    };
    const element = {
      ...defaultElement,
      ...inputElement,
    };
    const lastSection = (await workshop.populateSections())[
      workshop.sections.length - 1
    ];
    await workshop.getDatabase().collections.elements.atomicUpsert(element);

    await lastSection.atomicUpdate((draft) => {
      draft.elements.push(element.id);
      return draft;
    });
  }

  async pushElements(
    workshop: WorkshopDocument,
    elements: Partial<ElementDocType>[],
  ) {
    for (const element of elements) {
      await this.pushElement(workshop, element);
    }
  }

  async getNewSectionDocType(
    inputSection: Partial<SectionDocType>,
  ): Promise<SectionDocType> {
    const defaultSection = {
      id: this.generateUniqueId(),
      version: DEFAULT_VERSION,
      elements: [],
      name: "Unnamed",
      isVisible: true,
    };
    const section: SectionDocType = {
      ...defaultSection,
      ...inputSection,
    };
    return section;
  }

  async pushSection(
    workshop: WorkshopDocument,
    inputSection: Partial<SectionDocType>,
  ) {
    const section = await this.getNewSectionDocType(inputSection);
    const result = await workshop.getDatabase().sections.atomicUpsert(section);
    await workshop.atomicUpdate((draft) => {
      draft.sections.push(section.id);
      return draft;
    });
    logger("pushed new section %O into workshop %O", result, workshop);
  }

  async getNewWorkshopDocType(
    workshopInput: Partial<Pick<WorkshopDocument, "name" | "description">>,
  ): Promise<WorkshopDocType> {
    return {
      id: this.generateUniqueId(),
      version: DEFAULT_VERSION,
      updatedAt: 0,
      name: workshopInput.name ?? "Unnamed",
      description: workshopInput.description ?? "",
      sections: [],
      // updatedAt: Date.now(),
    };
  }

  flattenSections(sections: SectionDocType[]) {
    const result: Array<
      | { type: "section"; data: SectionDocType }
      | { type: "element"; data: { id: string } }
    > = [];
    for (const section of sections) {
      result.push({ type: "section", data: section });
      result.push(
        ...section.elements.map(
          (elementId): { type: "element"; data: { id: string } } => ({
            type: "element",
            data: { id: elementId },
          }),
        ),
      );
    }
    return result;
  }

  moveItemFromIndexToIndex(
    sections: SectionDocType[],
    visibleFromIndex: number,
    visibleToIndex: number,
  ) {
    const flatSections = this.flattenSections(sections);
    const visibleToGlobalIndex = (visibleIndex: number) => {
      let globalIndex = 0;
      let curVisibleIndex = 0;
      let collapsedFlag = false;
      for (const item of flatSections) {
        if (item.type === "section") {
          if (item.data.isVisible) {
            if (visibleIndex === curVisibleIndex) {
              return {
                item,
                globalIndex,
                collapsedChildrenCount: item.data.isCollapsed
                  ? item.data.elements.length
                  : 0,
              };
            }
            curVisibleIndex++;
          }
          collapsedFlag = !!item.data.isCollapsed;
        } else if (item.type === "element") {
          if (!collapsedFlag) {
            if (visibleIndex === curVisibleIndex) {
              return { item, globalIndex, collapsedChildrenCount: 0 };
            }
            curVisibleIndex++;
          }
        }
        globalIndex++;
      }
    };

    const from = visibleToGlobalIndex(visibleFromIndex);
    const to = visibleToGlobalIndex(visibleToIndex);

    if (from && to) {
      const removedItems = flatSections.splice(
        from.globalIndex,
        from.collapsedChildrenCount + 1,
      );
      const indexCorrection = from.globalIndex < to.globalIndex ? 1 : 0;
      flatSections.splice(to.globalIndex + indexCorrection, 0, ...removedItems);

      // TODO this code block is specific to changing the database and should go into its own function
      let elementIdsOfSection: string[] = [];
      let section: SectionDocType | undefined = undefined;
      const sections: SectionDocType[] = [];
      for (const item of flatSections) {
        if (item.type === "section") {
          if (section) {
            section.elements = elementIdsOfSection;
            elementIdsOfSection = [];
            sections.push(section);
          }
          section = item.data;
        } else if (item.type === "element") {
          elementIdsOfSection.push(item.data.id);
        }
      }
      if (section) {
        section.elements = elementIdsOfSection;
        elementIdsOfSection = [];
        sections.push(section);
      }
      return {
        sections,
      };
    } else {
      throw new Error("Reordering error");
    }
  }

  async hasContent(
    workshop: WorkshopDocument,
  ): Promise<"hasContent" | "noContent" | "missingData"> {
    if (!workshop.sections || !workshop.sections.length) {
      return "noContent";
    }
    logger(
      "hasContent - workshop sections length = %s",
      workshop.sections.length,
    );
    if (workshop.sections.length > 1) {
      return "hasContent";
    }
    if (workshop.sections.length === 1) {
      const populatedSections = await workshop.populateSections();
      logger("hasContent - populated sections = %O", populatedSections);

      if (populatedSections.length !== workshop.sections.length) {
        logger(
          "hasContent - WARN - length does not match. This occurs if the database is still replicating missing documents.",
        );
        return "missingData";
      }
      const firstSection = populatedSections[0];
      if (firstSection.isVisible || firstSection.elements.length > 0) {
        return "hasContent";
      }
    }
    return "noContent";
  }

  generateUniqueId() {
    return uuidv4();
  }
}

export const WORKSHOP_HELPER = new WorkshopHelper();
