interface RepositoryInterface {
  findAllByIds(ids: string[]): Promise<WorkshopSection[]>;
  findById(id: string): Promise<WorkshopSection | null>;
}
