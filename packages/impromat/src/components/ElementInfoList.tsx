import {
  Attribution,
  Brush,
  Favorite,
  Public,
  Search,
  Translate,
} from "@mui/icons-material";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { ElementVisibility } from "../graphql-client/graphql";
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
          icon={<Search color="primary" />}
        ></InfoListItem>
      )}
      {element.isFavorite && (
        <InfoListItem
          displayText="liked"
          icon={<Favorite color="like" />}
        ></InfoListItem>
      )}
      {element.isOwnerMe && element.visibility === ElementVisibility.Public && (
        <InfoListItem
          icon={<Public color="secondary" />}
          displayText="public"
        ></InfoListItem>
      )}

      {element.isOwnerMe && (
        <InfoListItem
          icon={<Brush color="primary" />}
          displayText="my element"
        ></InfoListItem>
      )}
      {!!element.sourceName && !element.isOwnerMe && (
        <InfoListItem
          icon={<Attribution />}
          displayText={element.sourceName}
        ></InfoListItem>
      )}
      {!!element.languageCode && (
        <InfoListItem
          icon={<Translate />}
          displayText={element.languageCode.toUpperCase()}
        ></InfoListItem>
      )}
    </>
  );
};
