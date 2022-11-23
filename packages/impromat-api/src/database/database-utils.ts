import { Workshop } from "../graphql/schema.gen";
import { Database } from "./database";

export class DatabaseUtils {
  constructor(protected database: Database) {}

  getElement(userId: string, elementId: string) {
    const workshops: Workshop[] = this.database.getWorkshops(userId);
    for (const workshop of workshops) {
      for (const section of workshop.sections) {
        for (const element of section.elements) {
          if (element.id === elementId) {
            return element;
          }
        }
      }
    }
    throw new Error(
      `No element with id ${elementId} found for user with id ${userId}`
    );
  }
}
