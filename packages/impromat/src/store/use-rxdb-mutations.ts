import immer from "immer";
import { useMemo } from "react";
import { RxCollection } from "rxdb";
import { useRxCollection } from "rxdb-hooks";
import { v4 as uuidv4 } from "uuid";
import { rootLogger } from "../logger";
import { AVAILABLE_COLORS } from "../theme/colors";
import { Element, Section } from "./schema.gen";
import { Workshop } from "./schema.gen";
import { WORKSHOP_HELPER } from "./workshop-helper";
const logger = rootLogger.extend("use-rxdb-mutations");

class RxMutations {
  constructor(private collection: RxCollection<Workshop>) {}

  async createNewSection(
    workshopInput: Workshop | string,
    sectionText: string,
  ) {
    const workshopId =
      typeof workshopInput === "string" ? workshopInput : workshopInput.id;
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    const color =
      AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)];
    await workshop.atomicUpdate((draft) => {
      draft.updatedAt = Date.now();
      WORKSHOP_HELPER.pushSection(draft, { name: sectionText, color });
      return draft;
    });
  }

  async addWorkshop(name: string, description: string) {
    const workshop = WORKSHOP_HELPER.newWorkshop({ name, description });
    workshop.updatedAt = Date.now();
    await this.collection.insert(workshop);
    return workshop.id;
  }

  async deleteWorkshop(id: string) {
    const workshop = await this.findWorkshopById(id);
    if (!workshop) return;
    await workshop.update({ $set: { updatedAt: Date.now() } });
    await workshop.remove();
  }

  async updateWorkshop(newWorkshop: Workshop) {
    const workshop = await this.findWorkshopById(newWorkshop.id);
    if (!workshop) return;
    await this.collection.upsert({
      ...newWorkshop,
      updatedAt: Date.now(),
    });
  }

  async removePartFromWorkshop(workshopId: string, partId: string) {
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    await workshop.atomicUpdate((draft) => {
      draft.updatedAt = Date.now();
      const result = WORKSHOP_HELPER.removeElement(draft, partId);
      if (!result) {
        console.error("Could not remove element from workshop (not found).");
      }
      return draft;
    });
  }

  async updateWorkshopSection(
    workshopInput: Workshop | string,
    sectionToUpdate: Section,
    updateFunction?: (sectionDraft: Section) => Section,
  ) {
    const workshopId =
      typeof workshopInput === "string" ? workshopInput : workshopInput.id;
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    await workshop.atomicUpdate((draft) => {
      draft.updatedAt = Date.now();

      let updatedSection: Section | undefined = undefined;
      if (updateFunction) {
        updatedSection = immer(sectionToUpdate, (sectionDraft) =>
          updateFunction(sectionDraft),
        );
      } else {
        updatedSection = sectionToUpdate;
      }

      const result = WORKSHOP_HELPER.updateSection(draft, updatedSection);
      if (!result) {
        throw new Error(
          "Cannot update section because its id was not found in the workshop",
        );
      }
      return draft;
    });
  }

  async updateWorkshopElement(workshopId: string, updateElement: Element) {
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    await workshop.atomicUpdate((draft) => {
      draft.updatedAt = Date.now();

      const result = WORKSHOP_HELPER.updateElement(draft, updateElement);
      if (!result) {
        console.error(
          `Workshop part with id ${updateElement.id} and name ${updateElement.name} was not found in workshop with id ${workshopId}.`,
          "search result=",
          result,
          "sections=",
          draft.sections,
        );
        throw new Error(
          "Cannot update part because its id was not found in the workshop",
        );
      }
      return draft;
    });
  }

  async addNewElementToWorkshop(
    workshopId: string,
    name: string,
    markdown: string,
  ) {
    const newElementId = this.generateUniqueId();
    const rxdbWorkshop = await this.findWorkshopById(workshopId);
    if (!rxdbWorkshop) return;
    await rxdbWorkshop.atomicUpdate((draft) => {
      draft.updatedAt = Date.now();

      WORKSHOP_HELPER.pushElement(draft, {
        id: newElementId,
        markdown: markdown,
        name: name,
        sourceUrl: undefined,
        tags: [],
        note: "",
        languageCode: undefined,
        basedOn: undefined,
        licenseName: undefined,
        licenseUrl: undefined,
        sourceBaseUrl: undefined,
        sourceName: undefined,
      });
      draft.sections[draft.sections.length - 1].isCollapsed = false;

      return draft;
    });
    return newElementId;
  }

  async removeSectionFromWorkshop(workshopId: string, sectionId: string) {
    logger("Removing section from workshop");
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    await workshop.atomicUpdate((draft) => {
      draft.updatedAt = Date.now();
      const result = WORKSHOP_HELPER.removeSection(draft, sectionId);
      if (!result) {
        console.error("Could not remove section from workshop (not found).");
      }
      return draft;
    });
  }

  async addImprovElementToWorkshop(workshopId: string, improvElement: Element) {
    logger(
      "Adding improv element to workshop with id %s. (improvElement = %O)",
      workshopId,
      improvElement,
    );
    const newElementId = this.generateUniqueId();
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    await workshop.atomicUpdate((draft) => {
      draft.updatedAt = Date.now();
      WORKSHOP_HELPER.pushElement(draft, {
        ...improvElement,
        id: newElementId,
        basedOn: improvElement,
      });
      draft.sections[draft.sections.length - 1].isCollapsed = false;
      return draft;
    });
    return newElementId;
  }

  private generateUniqueId() {
    return uuidv4();
  }

  private async findWorkshopById(id: string) {
    logger("Looking up workshop with id %s", id);
    const workshop = await this.collection.findOne({ selector: { id } }).exec();
    if (!workshop) {
      logger(`No workshop with id ${id} found!`);
      return undefined;
    }
    logger("Workshop with id %s found!", id);
    logger("Workshop=%O", workshop);
    return workshop;
  }
}

export function useRxdbMutations() {
  const collection = useRxCollection<Workshop>("workshops");

  return useMemo(
    () => (collection ? new RxMutations(collection) : undefined),
    [collection],
  );
}
