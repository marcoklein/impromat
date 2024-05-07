import { useMemo } from "react";
import { ElementPreviewCard } from "../../components/ElementPreviewCard";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { routeLibraryElement } from "../../routes/shared-routes";
import { SearchSuggestions } from "./SearchSuggestions";

const LibraryElements_ElementSearchResult = graphql(`
  fragment LibraryElements_ElementSearchResult on ElementSearchResult {
    element {
      id
      createdAt
      updatedAt
      version
      deleted
      name
      summary
      markdownShort
      tags {
        id
        name
      }
      usedBy {
        id
      }
      languageCode
      sourceUrl
      sourceName
      sourceBaseUrl
      licenseName
      licenseUrl
      visibility
      isFavorite
      owner {
        id
      }
      isOwnerMe
      ...ElementItem_Element
      ...ElementPreviewItem_Element
    }
    ...ElementPreviewItem_ElementSearchResult
  }
`);

interface ContainerProps {
  elementSearchResultFragments?: FragmentType<
    typeof LibraryElements_ElementSearchResult
  >[];
  searchText: string;
  latestSearches: string[];
  /**
   * True if the query is stale and needs to be refetched.
   */
  isQueryStale: boolean;
  /**
   * True if the query is currently fetching.
   */
  isQueryFetching: boolean;
  scrollToTop: number;
  /**
   * Called when the search text changes when the user clicks on search suggestions for example.
   *
   * @param searchText New search text.
   */
  onSearchTextChange: (searchText: string) => void;
  onClearHistory: () => void;
  onEndReached: () => void;
}

/**
 * Renders a list of elements with virtual scroll.
 */
export const LibraryElements: React.FC<ContainerProps> = ({
  elementSearchResultFragments: elementFragments,
  searchText,
  latestSearches,
  isQueryStale,
  isQueryFetching,
  scrollToTop,
  onSearchTextChange,
  onClearHistory,
  onEndReached,
}) => {
  const elements = getFragmentData(
    LibraryElements_ElementSearchResult,
    elementFragments,
  );

  const showSearchSuggestions = useMemo(
    () => !elements?.length || !searchText.length,
    [elements, searchText],
  );

  return (
    <ResponsiveContainer>
      <VirtualCardGrid
        headerElement={
          showSearchSuggestions ? (
            <SearchSuggestions
              onSuggestionClick={onSearchTextChange}
              latestSearches={latestSearches}
              onClearHistory={onClearHistory}
            />
          ) : undefined
        }
        scrollStoreKey="search-element-tab-component"
        isFetching={isQueryFetching || isQueryStale}
        scrollToTop={scrollToTop}
        endReached={onEndReached}
        items={elements ?? []}
        itemContent={(_index, searchResult) => (
          <ElementPreviewCard
            key={_index}
            routerLink={routeLibraryElement(searchResult.element.id)}
            elementFragment={searchResult.element}
            elementSearchResultFragment={searchResult}
          ></ElementPreviewCard>
        )}
      ></VirtualCardGrid>
    </ResponsiveContainer>
  );
};
