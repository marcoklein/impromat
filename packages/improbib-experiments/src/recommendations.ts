import { Improbib, ImprobibElement } from "improbib";
import { findSimiliarTags } from "./find-similiar-tags";
import { TagMatrix } from "./tag-matrix";

interface Recommendation {
  element: ImprobibElement;
  distance: number;
  reasons: RecommendationReason[];
}

interface RecommendationReason {
  text: string;
  distance: number;
}

export function findRecommendationsForElement(
  element: ImprobibElement,
  improbib: Improbib,
  tagMatrix: TagMatrix,
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  for (const tag of element.tags) {
    if (tag === "game" || tag === "exercise" || tag === "warmup") {
      continue;
    }
    const tagIndex = tagMatrix.tags.indexOf(tag);
    if (tagIndex === -1) {
      // console.warn("Tag not found in tagMatrix: ", tag);
      continue;
    }

    const sameTagCount = tagMatrix.matrix[tagIndex][tagIndex];
    const tagRecommendations = improbib.elements
      .filter((element) => element.tags.includes(tag))
      .map(
        (element): Recommendation => ({
          element: element,
          distance: sameTagCount,
          reasons: [{ text: `same tag ${tag}`, distance: sameTagCount * 2 }],
        }),
      );
    recommendations.push(...tagRecommendations);

    const similiarTagRecommendations = findSimiliarTags(tag, tagMatrix).flatMap(
      (similiarTag) => {
        const { count: similiarTagCount, tag: similiarTagName } = similiarTag;
        if (similiarTagCount === 0) {
          return [];
        }
        if (element.tags.includes(similiarTagName)) {
          return [];
        }
        if (
          similiarTagName === "game" ||
          similiarTagName === "exercise" ||
          similiarTagName === "warmup"
        ) {
          return [];
        }
        return improbib.elements
          .filter((element) => element.tags.includes(similiarTagName))
          .map(
            (element): Recommendation => ({
              element: element,
              distance: similiarTagCount,
              reasons: [
                {
                  text: `${similiarTagName}`,
                  distance: similiarTagCount,
                },
              ],
            }),
          );
      },
    );
    recommendations.push(...similiarTagRecommendations);
  }

  const recommendationMap = new Map<string, Recommendation>();
  const mergedRecommendations: Recommendation[] = [];
  for (const recommendation of recommendations) {
    const existingRecommendation = recommendationMap.get(
      recommendation.element.identifier,
    );
    if (existingRecommendation) {
      if (
        !recommendation.reasons.find((reason) =>
          existingRecommendation.reasons.find(
            (existingReason) => reason.text === existingReason.text,
          ),
        )
      ) {
        existingRecommendation.distance += recommendation.distance;
        existingRecommendation.reasons.push(...recommendation.reasons);
      }
    } else {
      recommendationMap.set(recommendation.element.identifier, recommendation);
      mergedRecommendations.push(recommendation);
    }
  }

  return mergedRecommendations.sort((a, b) => b.distance - a.distance);
}
