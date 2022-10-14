export interface Database {
  addWorkshop(userId: string, workshop: any): void;
  setWorkshops(userId: string, workshops: any[]): void;
  getWorkshops(userId: string): any[];
}
