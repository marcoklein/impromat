import { FileDatabase } from "../../src/database/file-database";

export class FileDatabaseMock extends FileDatabase {
  constructor() {
    super("not-used");
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
