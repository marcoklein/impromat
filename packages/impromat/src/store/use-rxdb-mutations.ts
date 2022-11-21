import { useMemo } from "react";
import { useRxDB } from "rxdb-hooks";
import { v4 as uuidv4 } from "uuid";
import { rootLogger } from "../logger";
import { AVAILABLE_COLORS } from "../theme/colors";
import { ElementDocType } from "./collections/element-collection";
import { SectionDocType } from "./collections/section-collection";
import {
  WorkshopCollection,
  WorkshopDocType,
  WorkshopDocument,
} from "./collections/workshop-collection";
import { ImpromatRxDatabase } from "./initialize";
import { WORKSHOP_HELPER } from "./workshop-helper";
const logger = rootLogger.extend("use-rxdb-mutations");

class RxMutations {
  private collection: WorkshopCollection;
  constructor(private database: ImpromatRxDatabase) {
    this.collection = this.database.collections.workshops;
  }

  async createNewSection(
    workshopInput: WorkshopDocType | string,
    sectionText: string,
  ) {
    const workshopId =
      typeof workshopInput === "string" ? workshopInput : workshopInput.id;
    const dbWorkshop = await this.findWorkshopById(workshopId);
    if (!dbWorkshop) return;
    const color =
      AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)];

    const newSection = await WORKSHOP_HELPER.getNewSectionDocType({
      name: sectionText,
      color,
    });
    await this.database.sections.insert(newSection);
    await dbWorkshop.atomicUpdate((draft) => {
      draft.sections.push(newSection.id);
      return draft;
    });
  }

  async addWorkshop(name: string, description: string) {
    const workshop = WORKSHOP_HELPER.getNewWorkshopDocType({
      name,
      description,
    });
    // workshop.updatedAt = Date.now();
    await this.collection.insert(workshop);
    return workshop.id;
  }

  async deleteWorkshop(id: string) {
    const workshop = await this.findWorkshopById(id);
    if (!workshop) return;
    // TODO delete also sections and elements here or in a cleanup job?
    // must track references to other workshops
    await workshop.update({ $set: { updatedAt: Date.now() } });
    await workshop.remove();
  }

  async updateWorkshop(newWorkshop: WorkshopDocType) {
    const workshop = await this.findWorkshopById(newWorkshop.id);
    if (!workshop) return;
    await this.collection.upsert({
      ...newWorkshop,
      // updatedAt: Date.now(),
    });
  }

  async removePartFromWorkshop(workshopId: string, elementId: string) {
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    const result = await WORKSHOP_HELPER.removeElement(workshop, elementId);
    if (!result) {
      console.error("Could not remove element from workshop (not found).");
    }
  }

  async updateWorkshopSection(
    workshopInput: WorkshopDocType | string,
    sectionToUpdate: SectionDocType,
  ) {
    const workshopId =
      typeof workshopInput === "string" ? workshopInput : workshopInput.id;
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    const result = WORKSHOP_HELPER.updateSection(workshop, sectionToUpdate);
    if (!result) {
      throw new Error(
        "Cannot update section because its id was not found in the workshop",
      );
    }
  }

  async updateWorkshopElement(
    workshopId: string,
    updateElement: ElementDocType,
  ) {
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    const result = await WORKSHOP_HELPER.updateElement(workshop, updateElement);
    if (!result) {
      console.error(
        `Workshop part with id ${updateElement.id} and name ${updateElement.name} was not found in workshop with id ${workshopId}.`,
        "search result=",
        result,
        "sections=",
        workshop.sections,
      );
      throw new Error(
        "Cannot update part because its id was not found in the workshop",
      );
    }
  }

  async addNewElementToWorkshop(
    workshopId: string,
    name: string,
    markdown: string,
  ) {
    const newElementId = this.generateUniqueId();
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    await WORKSHOP_HELPER.pushElement(workshop, {
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
    await this.uncollapseLastWorkshopSection(workshop);
    return newElementId;
  }

  async uncollapseLastWorkshopSection(workshop: WorkshopDocument) {
    (await workshop.populateSections())[
      workshop.sections.length - 1
    ].atomicUpdate((draft) => {
      draft.isCollapsed = false;
      return draft;
    });
  }

  async removeSectionFromWorkshop(workshopId: string, sectionId: string) {
    logger("Removing section from workshop");
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    const result = WORKSHOP_HELPER.removeSection(workshop, sectionId);
    if (!result) {
      console.error("Could not remove section from workshop (not found).");
    }
  }

  async addImprovElementToWorkshop(
    workshopId: string,
    improvElement: ElementDocType,
  ) {
    logger(
      "Adding improv element to workshop with id %s. (improvElement = %O)",
      workshopId,
      improvElement,
    );
    const newElementId = this.generateUniqueId();
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    logger("Workshop=%O", workshop);
    // await workshop.getDatabase().collections.elements.upsert(improvElement);
    await WORKSHOP_HELPER.pushElement(workshop, {
      ...improvElement,
      id: newElementId,
      basedOn: improvElement.id,
    });
    await this.uncollapseLastWorkshopSection(workshop);
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
  const db = useRxDB() as any as ImpromatRxDatabase;

  return useMemo(() => (db ? new RxMutations(db) : undefined), [db]);
}
