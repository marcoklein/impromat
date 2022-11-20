import { FileDatabase } from "./file-database";

export class MemoryDatabase extends FileDatabase {
  constructor() {
    super("not-used", {} as any);
    this.store = {
      version: 0,
      workshopsOfUsers: {},
      users: {},
      elementsOfUsers: {},
      sectionsOfUsers: {},
    };
  }
  async load(): Promise<void> {}

  save(): void {}
}
