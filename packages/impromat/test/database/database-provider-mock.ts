import { RxDatabase, RxCollection } from "rxdb";
import { DatabaseProvider } from "../../src/database/provider/database-provider";

export class DatabaseProviderMock extends DatabaseProvider {
  async createDatabaseOfVersion(
    version: number,
    options?: { ignoreDuplicate: boolean } | undefined,
  ): Promise<
    RxDatabase<{ [key: string]: RxCollection<any, {}, {}, {}> }, any, any>
  > {
    return super.createDatabaseOfVersion(version, {
      ignoreDuplicate: true,
    });
  }
}
