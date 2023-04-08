import { findSimilarTags } from "./find-similar-tags";
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
const similarTags = findSimilarTags("Slapstick-Hektik-Action", tagMatrix);
console.log(
  "similarTags = ",
  similarTags.map((d) => `${d.tag} (${d.count})`).join(", "),
);

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
  // ({ name }) => name === "Schnittmuster",
  // ({ name }) => name === "Bunny - Bunny",
  // ({ name }) => name === "Dutch Square",
  ({ identifier }) => identifier === "d75a8a749eeb496878ba001d262198fc",
)[0];

console.log("===========");
console.log(`Recommendations for ${element.name}`);
console.log("===========");

const recommendations = findRecommendationsForElement(
  element,
  improbib,
  tagMatrix,
).slice(0, 10);
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

function findRecommendationsForTag(tag: string) {
  const elementsWithTag = improbibElements.filter((element) =>
    element.tags.includes(tag),
  );
  const recommendations = findRecommendationsForElement(
    elementsWithTag[0],
    improbib,
    tagMatrix,
  );
  return recommendations;
}

const recommendationsTag = "Charakter/Figur";
const recommendationsForTag = findRecommendationsForTag(recommendationsTag);
console.log("===========");
console.log("===========");
console.log("===========");
console.log(
  `recommendations for ${recommendationsTag} = \n`,
  recommendationsForTag
    .map(
      (d) =>
        `${d.element.name}\t(${d.distance})\t[reasons: ${d.reasons
          .map((reason) => `${reason.text} (${reason.distance})}`)
          .join(", ")}]`,
    )
    .join("\n"),
);

function generateListOfRecommendedElements(
  baseTag: string,
  numberOfElements: number,
) {
  const recommendations = findRecommendationsForTag(baseTag);
  const recommendedElements = recommendations
    .map((d) => d)
    .slice(0, numberOfElements);
  return recommendedElements;
}

const recommendedElements = generateListOfRecommendedElements(
  recommendationsTag,
  10,
);
console.log("===========");
console.log(
  "meaningfulTags = ",
  meaningfulTags.map((d) => `"${d.tag}"`).join(", "),
);
console.log("===========");
const similarTagsOfTag = findSimilarTags(recommendationsTag, tagMatrix);
console.log(
  "similarTags = ",
  similarTagsOfTag.map((d) => `${d.tag} (${d.count})`).join(", "),
);
console.log("===========");
console.log("===========");
console.log(`Workshop recommendation for tag ${recommendationsTag}:`);
console.log(
  " ",
  recommendedElements
    .map(
      (d) =>
        `${d.element.name}\t(${d.distance})\t[reasons: ${d.reasons
          .map((reason) => `${reason.text}`)
          .join(", ")}]`,
    )
    .join("\n  "),
);
