import { TagMatrix } from "./tag-matrix";

export function findTagsOftenUsedWithOthers(tagMatrix: TagMatrix) {
  function getTagReferences(tagIndex: number) {
    return (
      tagMatrix.matrix[tagIndex].reduce(
        (previousValue, currentValue) => previousValue + currentValue,
      ) - tagMatrix.getTotalCountOfTag(tagIndex)
    );
  }
  const { tags } = tagMatrix;
  const result: { tag: string; references: number }[] = [];
  for (let i = 0; i < tags.length; i++) {
    result.push({ tag: tags[i], references: getTagReferences(i) });
  }

  return result;
}
