import { v4 as uuidv4 } from "uuid";
import { rootLogger } from "../logger";
import { AVAILABLE_COLORS } from "../theme/colors";
import { ElementDocType } from "./collections/element/element-collection";
import { SectionDocType } from "./collections/section/section-collection";
import { UserDocType } from "./collections/user/user-collection-types";
import {
  WorkshopCollection,
  WorkshopDocType,
  WorkshopDocument,
} from "./collections/workshop/workshop-collection";
import { AppDatabase } from "./database-type";
import { WORKSHOP_HELPER } from "./workshop-helper";
const logger = rootLogger.extend("rxdb-mutations");

export class RxMutations {
  private collection: WorkshopCollection;
  constructor(private database: AppDatabase) {
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

  async updateWorkshopName(workshopId: string, newName: string) {
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) return;
    await workshop.update({ $set: { name: newName } });
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
    baseElementId: string,
    elementInput: Partial<ElementDocType>,
  ) {
    const elementInputCopy = { ...elementInput };
    delete elementInputCopy.id;
    delete elementInputCopy.markdown;
    elementInputCopy.basedOn = baseElementId;
    const workshop = await this.findWorkshopById(workshopId);
    if (!workshop) {
      throw new Error('Workshop with id "' + workshopId + '" not found.');
    }
    const document = WORKSHOP_HELPER.getNewElementDocType(elementInputCopy);
    await WORKSHOP_HELPER.pushElement(workshop, document);
    await this.uncollapseLastWorkshopSection(workshop);
    return document.id;
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

  async ensureElementExists(element: ElementDocType) {
    await this.database.collections.elements.upsert(element);
  }

  async updateElement(element: ElementDocType) {
    return this.database.elements.atomicUpsert(element);
  }

  async addNewElement(elementInput: Partial<ElementDocType>) {
    const element = WORKSHOP_HELPER.getNewElementDocType(elementInput);
    return this.database.elements.atomicUpsert(element);
  }

  async toggleFavoriteElementOfUser(userDoc: UserDocType, elementId: string) {
    let isFavoriteNow = false;

    const users = await this.database.users.findByIds([userDoc.id]);
    const user = users.get(userDoc.id);
    if (!user) {
      console.warn("User not found", userDoc.id);
      return;
    }
    await user.atomicUpdate((user) => {
      const index = user.favoriteElements.indexOf(elementId);
      if (index >= 0) {
        isFavoriteNow = false;
        user.favoriteElements.splice(index, 1);
      } else {
        isFavoriteNow = true;
        user.favoriteElements.push(elementId);
      }
      return user;
    });
    return isFavoriteNow;
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
