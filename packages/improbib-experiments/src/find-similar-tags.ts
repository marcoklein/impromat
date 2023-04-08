import { TagMatrix } from "./tag-matrix";

export function findSimilarTags(tagName: string, tagMatrix: TagMatrix) {
  const { matrix, tags } = tagMatrix;
  const baseTag = tagName;
  const tagsNearBaseTag = matrix[tags.indexOf(baseTag)];
  const similarTagsDict = tagsNearBaseTag.map((d, i) => ({
    tag: tags[i],
    count: d,
  }));
  const sortedSimilarTags = similarTagsDict.sort((a, b) => b.count - a.count);
  return sortedSimilarTags;
}
