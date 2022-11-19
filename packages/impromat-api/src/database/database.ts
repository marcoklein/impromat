import { UserModel } from "./user-model";

export interface Database {
  addWorkshop(userId: string, workshop: any): void;
  setWorkshops(userId: string, workshops: any[]): void;
  getWorkshop(userId: string, workshopId: string): any;
  getWorkshops(userId: string): any[];
  setUser(userId: string, user: UserModel): void;
  getUser(userId: string): UserModel | undefined;
}
