import { ImprobibElement, ImprobibEntry } from "improbib";
import { TagFrequency } from "./tag-frequency";

export class TagMatrix {
  frequency = new TagFrequency(this);

  constructor(
    public readonly matrix: number[][],
    public readonly tags: string[],
  ) {}

  static fromElements(elements: ImprobibElement[]) {
    const tags = [...new Set(elements.flatMap((d) => d.tags))];
    console.log("number of tags = ", tags.length);
    console.log("tags = ", tags.join(", "));
    const matrix = prepareMatrix(tags.length);
    fillMatrix(matrix, tags, elements);
    return new TagMatrix(matrix, tags);
  }

  getTotalCountOfTag(tagIndex: number) {
    return this.matrix[tagIndex][tagIndex];
  }

  tagsWithTotalCount() {
    const { matrix, tags } = this;
    const result: { tag: string; count: number }[] = [];
    for (let i = 0; i < tags.length; i++) {
      result.push({ tag: tags[i], count: matrix[i][i] });
    }
    return result;
  }
}

function fillMatrix(
  matrix: number[][],
  tags: string[],
  elements: ImprobibEntry[],
) {
  for (const tag of tags) {
    for (const element of elements) {
      const tagsOfElement = element.tags;
      if (tagsOfElement.includes(tag)) {
        for (const tagOfElement of tagsOfElement) {
          const index = tags.indexOf(tagOfElement);
          matrix[tags.indexOf(tag)][index] += 1;
        }
      }
    }
  }
}

function prepareMatrix(dimensions: number) {
  const matrix: number[][] = [];
  for (let i = 0; i < dimensions; i++) {
    const row: number[] = [];
    for (let j = 0; j < dimensions; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}
