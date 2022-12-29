import { TagMatrix } from "./tag-matrix";

export function findSimiliarTags(tagName: string, tagMatrix: TagMatrix) {
  const { matrix, tags } = tagMatrix;
  const baseTag = tagName;
  const tagsNearBaseTag = matrix[tags.indexOf(baseTag)];
  // console.log("tagsNearBaseTag = ", tagsNearBaseTag.join(", "));
  const similiarTagsDict = tagsNearBaseTag.map((d, i) => ({
    tag: tags[i],
    count: d,
  }));
  const similiarTags = similiarTagsDict.sort((a, b) => b.count - a.count);
  // console.log(
  //   "similiarTags = ",
  //   similiarTags.map((d) => `${d.tag} (${d.count})`).join(", "),
  // );
  return similiarTags;
}
