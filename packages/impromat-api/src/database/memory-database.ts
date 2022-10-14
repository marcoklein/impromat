export class MemoryDatabase {
  store: Record<string, any[]> = {};

  constructor() {}

  addWorkshop(userId: string, workshop: any) {
    console.log("Adding workshop", JSON.stringify(workshop, undefined, 2));
    this.store[userId].push(workshop);
  }

  setWorkshops(userId: string, workshops: any[]) {
    console.log("Set workshops", JSON.stringify(workshops, undefined, 2));
    this.store[userId] = workshops;
  }

  getWorkshops(userId: string) {
    return this.store[userId] ?? [];
  }
}
