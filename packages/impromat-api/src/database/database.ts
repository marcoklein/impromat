import { ElementModel } from "./element-model";
import { SectionModel } from "./section-model";
import { UserModel } from "./user-model";

export interface Database {
  addWorkshop(userId: string, workshop: any): void;
  setWorkshops(userId: string, workshops: any[]): void;
  getWorkshop(userId: string, workshopId: string): any;
  getWorkshops(userId: string): any[];
  getElements(userId: string): ElementModel[] | undefined;
  setElements(userId: string, elements: ElementModel[]): void;
  getSections(userId: string): SectionModel[] | undefined;
  setUser(userId: string, user: UserModel): void;
  getUser(userId: string): UserModel | undefined;
}
