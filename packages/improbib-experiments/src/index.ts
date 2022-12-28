import * as fs from "fs/promises";
import { Improbib, ImprobibEntry } from "improbib";
import { environment } from "./environment";

const file = await fs.readFile(`${environment.INPUT_FILE_PATH}`);
const jsonInput = file.toString();
const improbib = JSON.parse(jsonInput) as Improbib;
const improbibEntries = improbib.elements;

// which tags are frequently used together?
export function mentionTheSameTageInElement() {}

const improwikiDeElements = improbibEntries.filter(
  (d) =>
    d.type === "element" &&
    d.sourceName === "improwiki" &&
    d.languageCode === "de",
);

const tags = [...new Set(improwikiDeElements.flatMap((d) => d.tags))];
console.log("number of tags = ", tags.length);
console.log("tags = ", tags.join(", "));
const matrix = prepareMatrix(tags.length);
fillMatrix(matrix, tags, improwikiDeElements);

const baseTag = "Gruppe";
console.log(
  'number of elements with tag "Gruppe" = ',
  improwikiDeElements.filter((d) => d.tags.includes(baseTag)).length,
);

const tagsNearBaseTag = matrix[tags.indexOf(baseTag)];
console.log("tagsNearBaseTag = ", tagsNearBaseTag.join(", "));
const similiarTagsDict = tagsNearBaseTag.map((d, i) => ({
  tag: tags[i],
  count: d,
}));
const similiarTags = similiarTagsDict.sort((a, b) => b.count - a.count);
console.log(
  "similiarTags = ",
  similiarTags.map((d) => `${d.tag} (${d.count})`).join(", "),
);

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
    const row = [];
    for (let j = 0; j < dimensions; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}
