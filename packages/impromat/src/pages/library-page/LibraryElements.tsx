import { ElementPreviewCard } from "../../components/ElementPreviewCard";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
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
  isQueryStale: boolean;
  isQueryFetching: boolean;
  scrollToTop: number;
  pageNumber: number;
  setPageNumber: (setFn: (currentNumber: number) => number) => void;
  /**
   * Called when the search text changes when the user clicks on search suggestions for example.
   *
   * @param searchText New search text.
   */
  onSearchTextChange: (searchText: string) => void;
  onClearHistory: () => void;
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
  pageNumber,
  setPageNumber,
  onSearchTextChange,
  onClearHistory,
}) => {
  const logger = useComponentLogger("MuiLibraryElements");
  const elements = getFragmentData(
    LibraryElements_ElementSearchResult,
    elementFragments,
  );

  const showSearchSuggestions = !elements?.length || !searchText.length;

  return (
    <VirtualCardGrid
      headerElement={
        showSearchSuggestions ? (
          <ResponsiveContainer>
            <SearchSuggestions
              onSuggestionClick={onSearchTextChange}
              latestSearches={latestSearches}
              onClearHistory={onClearHistory}
            />
          </ResponsiveContainer>
        ) : undefined
      }
      scrollStoreKey="search-element-tab-component"
      isFetching={isQueryFetching || isQueryStale}
      scrollToTop={scrollToTop}
      endReached={() => {
        logger("end reached, queryResult.stale=%s", isQueryStale);
        if (!isQueryStale) {
          setPageNumber((currentPageNumber) => currentPageNumber + 1);
          logger("setting page number to %s", pageNumber + 1);
        }
      }}
      items={elements ?? []}
      itemContent={(_index, searchResult) => (
        <ResponsiveContainer>
          <ElementPreviewCard
            routerLink={routeLibraryElement(searchResult.element.id)}
            elementFragment={searchResult.element}
            elementSearchResultFragment={searchResult}
          ></ElementPreviewCard>
        </ResponsiveContainer>
      )}
    ></VirtualCardGrid>
  );
};
