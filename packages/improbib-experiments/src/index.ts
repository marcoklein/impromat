import { findSimiliarTags } from "./find-similiar-tags";
import { loadImprobibFromFile } from "./load-improbib-from-file";
import { findRecommendationsForElement } from "./recommendations";
import { TagMatrix } from "./tag-matrix";
import { findTagsOftenUsedWithOthers } from "./tags-often-used-with-others";

const improbib = await loadImprobibFromFile();
const improbibElements = improbib.elements;
const improwikiDeElements = improbibElements.filter(
  ({ sourceName, languageCode }) =>
    sourceName === "improwiki" && languageCode === "de",
);

const tagMatrix = TagMatrix.fromElements(improwikiDeElements);

console.log("===========");
console.log("Similiar Tags");
console.log("===========");
findSimiliarTags("warmup", tagMatrix);

const meaningfulTags = tagMatrix.frequency.findFrequentlyUsedTags();
const seldomTags = tagMatrix.frequency.findUnfrequentlyUsedTags();

console.log(
  "meaningfulTags = ",
  meaningfulTags.map((d) => `${d.tag} (${d.count})`).join(", "),
);

console.log(
  "seldomTags = ",
  seldomTags.map((d) => `${d.tag} (${d.count})`).join(", "),
);

const referencedTags = findTagsOftenUsedWithOthers(tagMatrix).sort(
  (a, b) => b.references - a.references,
);
console.log(
  "frequentlyReferenced = ",
  referencedTags.map((d) => `${d.tag} (${d.references})`).join(", "),
);

const element = improbib.elements.filter(
  // ({ name }) => name === "Solo-Dreieck",
  // ({ name }) => name === "Freeze Tag",
  // ({ name }) => name === "Promiachterbahn",
  // ({ name }) => name === "You",
  ({ name }) => name === "Schnittmuster",
)[0];

console.log("===========");
console.log(`Recommendations for ${element.name}`);
console.log("===========");

const recommendations = findRecommendationsForElement(
  element,
  improbib,
  tagMatrix,
).slice(0, 20);
console.log(
  `recommendations for ${element.name} = \n`,
  recommendations
    .map(
      (d) =>
        `${d.element.name}\t(${d.distance})\t[reasons: ${d.reasons
          .map((reason) => `${reason.text} (${reason.distance})}`)
          .join(", ")}]`,
    )
    .join("\n"),
);

const elementRecommendationMap: Record<string, any> = {};
for (const element of improwikiDeElements) {
  const recommendations = findRecommendationsForElement(
    element,
    improbib,
    tagMatrix,
  );
  elementRecommendationMap[element.name] = recommendations.map((d) => ({
    name: d.element.name,
    distance: d.distance,
    reasons: d.reasons,
  }));
}
// await writeFile(
//   "elementRecommendationsMap.json",
//   JSON.stringify(elementRecommendationMap, undefined, 2),
// );
