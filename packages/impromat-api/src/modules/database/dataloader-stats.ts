export class DataLoaderStatsBuilder {
  queryCount: number = 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  increaseQueryCount(key: string) {
    // TODO count for each key
    this.queryCount = this.queryCount + 1;
    console.log('queryCount', this.queryCount);
  }
}
