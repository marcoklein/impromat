import { v4 as uuidv4 } from "uuid";
import { Element, Section, Workshop } from "./schema.gen";

export class WorkshopHelper {
  findElement(workshop: Workshop, workshopElementId: string) {
    for (const section of workshop.sections) {
      const elementIndexInSection = section.elements.findIndex(
        (element) => element.id === workshopElementId,
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

  findSection(workshop: Workshop, workshopSectionId: string) {
    const sectionIndexInWorkshop = workshop.sections.findIndex(
      (section) => section.id === workshopSectionId,
    );
    if (sectionIndexInWorkshop >= 0) {
      return {
        section: workshop.sections[sectionIndexInWorkshop],
        sectionIndexInWorkshop,
      };
    }
    return undefined;
  }

  getElements(workshop: Workshop | undefined) {
    if (!workshop) return [];
    const elements: Element[] = [];
    for (const section of workshop.sections) {
      for (const element of section.elements) {
        elements.push(element);
      }
    }
    return elements;
  }

  updateElement(workshop: Workshop, workshopElement: Element) {
    const result = this.findElement(workshop, workshopElement.id);
    if (result && result.elementIndexInSection >= 0) {
      result.section.elements[result.elementIndexInSection] = workshopElement;
      return true;
    }
    return false;
  }

  updateSection(workshop: Workshop, workshopSection: Section) {
    const result = this.findSection(workshop, workshopSection.id);
    if (result && result.sectionIndexInWorkshop >= 0) {
      workshop.sections[result.sectionIndexInWorkshop] = workshopSection;
      return true;
    }
    return false;
  }

  removeElement(workshop: Workshop, workshopElement: Element | string) {
    const workshopElementId =
      typeof workshopElement === "string"
        ? workshopElement
        : workshopElement.id;
    const result = this.findElement(workshop, workshopElementId);

    if (result && result.elementIndexInSection >= 0) {
      result.section.elements.splice(result.elementIndexInSection, 1);
      return true;
    }
    return false;
  }

  removeSection(workshop: Workshop, workshopSection: Section | string) {
    const workshopSectionId =
      typeof workshopSection === "string"
        ? workshopSection
        : workshopSection.id;
    const result = this.findSection(workshop, workshopSectionId);

    if (result && result.sectionIndexInWorkshop >= 0) {
      workshop.sections.splice(result.sectionIndexInWorkshop, 1);
      return true;
    }
    return false;
  }

  pushElement(workshop: Workshop, inputElement: Partial<Element>) {
    if (workshop.sections.length === 0) {
      this.pushSection(workshop, { isVisible: false });
    }

    const defaultElement: Element = {
      id: this.generateUniqueId(),
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

  pushElements(workshop: Workshop, elements: Partial<Element>[]) {
    for (const element of elements) {
      this.pushElement(workshop, element);
    }
  }

  pushSection(workshop: Workshop, inputSection: Partial<Section>) {
    const defaultSection: Section = {
      id: this.generateUniqueId(),
      elements: [],
      name: "Unnamed",
      isVisible: true,
    };
    const section: Section = {
      ...defaultSection,
      ...inputSection,
    };
    workshop.sections.push(section);
  }

  newWorkshop(
    workshopInput: Partial<Pick<Workshop, "name" | "description">>,
  ): Workshop {
    return {
      id: this.generateUniqueId(),
      deleted: false,
      name: workshopInput.name ?? "Unnamed",
      description: workshopInput.description ?? "",
      sections: [],
      updatedAt: Date.now(),
    };
  }

  flattenSections(workshop: Workshop) {
    const result: Array<
      { type: "section"; data: Section } | { type: "element"; data: Element }
    > = [];
    for (const section of workshop.sections) {
      result.push({ type: "section", data: section });
      result.push(
        ...section.elements.map(
          (element): { type: "element"; data: Element } => ({
            type: "element",
            data: element,
          }),
        ),
      );
    }
    return result;
  }

  moveItemFromIndexToIndex(
    workshop: Workshop,
    visibleFromIndex: number,
    visibleToIndex: number,
  ) {
    const flatSections = this.flattenSections(workshop);
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
      workshop.sections = [];
      for (const item of flatSections) {
        if (item.type === "section") {
          item.data.elements = [];
          this.pushSection(workshop, item.data);
        } else if (item.type === "element") {
          this.pushElement(workshop, item.data);
        }
      }
    } else {
      throw new Error("Reordering error");
    }
  }

  hasContent(workshop: Workshop) {
    return (
      workshop.sections.length > 1 ||
      (workshop.sections.length === 1 &&
        (workshop.sections[0].isVisible ||
          workshop.sections[0].elements.length > 0))
    );
  }

  generateUniqueId() {
    return uuidv4();
  }
}

export const WORKSHOP_HELPER = new WorkshopHelper();
