import { TagMatrix } from "./tag-matrix";

export class TagFrequency {
  countToBeFrequent = 2;

  constructor(public tagMatrix: TagMatrix) {}

  findFrequentlyUsedTags() {
    const sortedTagsWithTotalCounts = this.tagMatrix
      .tagsWithTotalCount()
      .filter(({ count }) => count > this.countToBeFrequent)
      .sort((a, b) => b.count - a.count);
    return sortedTagsWithTotalCounts;
  }

  findUnfrequentlyUsedTags() {
    const sortedTagsWithTotalCounts = this.tagMatrix
      .tagsWithTotalCount()
      .filter(({ count }) => count <= this.countToBeFrequent)
      .sort((a, b) => b.count - a.count);
    return sortedTagsWithTotalCounts;
  }
}
