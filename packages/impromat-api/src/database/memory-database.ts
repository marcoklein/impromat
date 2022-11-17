import { Database } from "./database";
import { DatabaseUser } from "./database-user";

export class MemoryDatabase implements Database {
  store: Record<string, any[]> = {};
  userStore: Record<string, DatabaseUser> = {};

  constructor() {}

  addWorkshop(userId: string, workshop: any) {
    console.log("Adding workshop", JSON.stringify(workshop, undefined, 2));
    if (!this.store[userId]) {
      this.store[userId] = [];
    }
    this.store[userId].push(workshop);
  }

  setWorkshops(userId: string, workshops: any[]) {
    console.log("Set workshops", JSON.stringify(workshops, undefined, 2));
    this.store[userId] = workshops;
  }

  getWorkshops(userId: string) {
    return this.store[userId] ?? [];
  }

  getWorkshop(userId: string, workshopId: string) {
    const workshops = this.getWorkshops(userId);
    const workshop = workshops.find((workshop) => workshop.id === workshopId);
    return workshop;
  }

  setUser(userId: string, user: DatabaseUser) {
    this.userStore[userId] = user;
  }

  getUser(userId: string): DatabaseUser {
    const user = this.userStore[userId];
    if (!user) {
      return {
        favoriteElementIds: [],
      };
    }
    return user;
  }
}
