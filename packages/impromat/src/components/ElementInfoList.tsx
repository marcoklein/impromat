import { brush, eye, heart, search } from "ionicons/icons";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { ElementVisibility } from "../graphql-client/graphql";
import { COLOR_LIKE, COLOR_USER_CREATED } from "../theme/theme-colors";
import { InfoListItem } from "./InfoListItem";

const ElementInfoList_ElementSearchResult = graphql(`
  fragment ElementInfoList_ElementSearchResult on ElementSearchResult {
    score
    matches {
      key
      indices
      refIndex
      value
    }
  }
`);

const ElementInfoList_Element = graphql(`
  fragment ElementInfoList_Element on Element {
    id
    isFavorite
    isOwnerMe
    languageCode
    sourceName
    visibility
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof ElementInfoList_Element>;
  /**
   * Set if context is a search result to mark search result matches.
   */
  elementSearchResultFragment?: FragmentType<
    typeof ElementInfoList_ElementSearchResult
  > | null;
}

/**
 * Previews content of an element in a card. Use within a grid or list.
 */
export const ElementInfoList: React.FC<ContainerProps> = ({
  elementFragment,
  elementSearchResultFragment,
}) => {
  const element = getFragmentData(ElementInfoList_Element, elementFragment);
  const searchResult = getFragmentData(
    ElementInfoList_ElementSearchResult,
    elementSearchResultFragment,
  );

  return (
    <>
      {searchResult && searchResult.score < 0.05 && (
        <InfoListItem
          displayText="high match"
          ionicIcon={search}
          color="primary"
        ></InfoListItem>
      )}
      {element.isFavorite && (
        <InfoListItem
          displayText="liked"
          ionicIcon={heart}
          color={COLOR_LIKE}
        ></InfoListItem>
      )}
      {element.isOwnerMe && element.visibility === ElementVisibility.Public && (
        <InfoListItem
          ionicIcon={eye}
          color="tertiary"
          displayText="public"
        ></InfoListItem>
      )}

      {element.isOwnerMe && (
        <InfoListItem
          ionicIcon={brush}
          color={COLOR_USER_CREATED}
          displayText="my element"
        ></InfoListItem>
      )}
      {!!element.sourceName && !element.isOwnerMe && (
        <InfoListItem
          tablerIcon="license"
          displayText={element.sourceName}
        ></InfoListItem>
      )}
      {!!element.languageCode && (
        <InfoListItem
          tablerIcon="language"
          displayText={element.languageCode.toUpperCase()}
        ></InfoListItem>
      )}
    </>
  );
};
