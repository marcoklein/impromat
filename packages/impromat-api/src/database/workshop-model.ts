export interface WorkshopModel {
  id: string;
  updatedAt: number;
  version: number;
  deleted: boolean;
  name: string;
  description: string;
  sections: string[];
}
