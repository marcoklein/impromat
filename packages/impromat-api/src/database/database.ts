import { DatabaseUser } from "./database-user";

export interface Database {
  addWorkshop(userId: string, workshop: any): void;
  setWorkshops(userId: string, workshops: any[]): void;
  getWorkshop(userId: string, workshopId: string): any;
  getWorkshops(userId: string): any[];
  setUser(userId: string, user: DatabaseUser): void;
  getUser(userId: string): DatabaseUser;
}
