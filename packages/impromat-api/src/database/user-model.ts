export interface UserModel {
  version: number;
  deleted: boolean;
  createdAt: number;
  updatedAt: number;
  favoriteElementIds: string[];
}
