import Box from "@mui/material/Box";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useQuery } from "urql";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { usePersistedState } from "../../hooks/use-persisted-state";
import { useSearchParam } from "../../hooks/use-search-params";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { ROUTE_LIBRARY_SEARCH_PARAM } from "../../routes/shared-routes";
import { LibraryElements } from "./LibraryElements";
import { LibraryPageAppBar } from "./LibraryPageAppBar";
import { NewElementButton } from "./NewElementButton";
import { QueryErrorAlert } from "./QueryErrorAlert";
import { parseSearchInput } from "./parse-search-input";

const MuiLibraryPageQuery = graphql(`
  query MuiLibraryPageQuery(
    $input: ElementSearchInput!
    $skip: Int!
    $take: Int!
  ) {
    searchElements(input: $input, skip: $skip, take: $take) {
      element {
        id
        name
        ...ElementItem_Element
      }
      ...LibraryElements_ElementSearchResult
    }
  }
`);

export const LIBRARY_ITEMS_PER_PAGE = 20;

export const LibraryPage: React.FC = () => {
  const { i18n } = useTranslation("LibraryPage");
  const logger = useComponentLogger("LibraryPage");

  const searchTextFromUrlParam = useSearchParam(ROUTE_LIBRARY_SEARCH_PARAM);
  useStateChangeLogger(
    searchTextFromUrlParam,
    "searchTextFromUrlParam",
    logger,
  );
  const searchText = useMemo(
    () => searchTextFromUrlParam ?? "",
    [searchTextFromUrlParam],
  );
  const [latestSearches, setLatestSearches] = usePersistedState<string[]>(
    "latestSearches",
    [],
  );
  useEffect(() => {
    if (searchText && !latestSearches.includes(searchText)) {
      setLatestSearches([searchText, ...latestSearches].slice(0, 5));
    }
  }, [latestSearches, setLatestSearches, searchText]);

  const [selectedLanguages, setSelectedLanguages] = usePersistedState<string[]>(
    "lastSelectedLanguages",
    [i18n.language.split("-")[0]],
  );
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = LIBRARY_ITEMS_PER_PAGE;

  useStateChangeLogger(pageNumber, "pageNumber", logger);

  const [searchElementsQueryResult, reexecuteSearchElementsQuery] = useQuery({
    query: MuiLibraryPageQuery,
    variables: {
      input: {
        languageCodes: selectedLanguages,
        ...parseSearchInput(searchText ?? ""),
      },
      skip: pageNumber * itemsPerPage,
      take: itemsPerPage,
    },
  });
  const elementsResult = searchElementsQueryResult.data?.searchElements;
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(0);

  const resetScroll = useCallback(() => {
    setPageNumber(0);
    setScrollToTop((current) => current + 1);
    logger("Scroll reset");
  }, [logger]);

  useEffect(() => {
    resetScroll();
  }, [selectedLanguages, resetScroll, searchText]);

  const history = useHistory();

  const onSearchTextChange = (searchText: string) => {
    const params = new URLSearchParams();
    params.append(ROUTE_LIBRARY_SEARCH_PARAM, searchText);
    history.push({ search: params.toString() });
    logger("Search text changed to %s", searchText);
  };

  const onClearHistory = useCallback(() => {
    setLatestSearches([]);
  }, [setLatestSearches]);

  const onEndReached = useCallback(() => {
    const isQueryStale = searchElementsQueryResult.stale;
    logger("end reached, queryResult.stale=%s", isQueryStale);
    const isQueryCurrent =
      (pageNumber + 1) * itemsPerPage === elementsResult?.length &&
      !isQueryStale;
    logger("end reached, isQueryCurrent=%s", isQueryCurrent);
    logger("end reached, loaded elements=%s", (pageNumber + 1) * itemsPerPage);
    logger(
      "end reached, pageNumber=%s, itemsPerPage=%s, elementsResult=%s",
      pageNumber,
      itemsPerPage,
      elementsResult?.length,
    );

    if (isQueryCurrent) {
      setPageNumber((current) => current + 1);
      setPageNumber(pageNumber + 1);
      logger("setting page number to %s", pageNumber + 1);
    }
  }, [
    searchElementsQueryResult.stale,
    pageNumber,
    itemsPerPage,
    elementsResult?.length,
    logger,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      <LibraryPageAppBar
        queryIsFetching={searchElementsQueryResult.fetching}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        reexecuteSearchElementsQuery={reexecuteSearchElementsQuery}
        menuDialogOpen={menuDialogOpen}
        setMenuDialogOpen={setMenuDialogOpen}
      ></LibraryPageAppBar>
      <QueryErrorAlert
        error={searchElementsQueryResult.error}
        onRetry={reexecuteSearchElementsQuery}
      />
      <IsLoggedIn>
        <NewElementButton />
      </IsLoggedIn>
      <LibraryElements
        searchText={searchText}
        latestSearches={latestSearches}
        scrollToTop={scrollToTop}
        elementSearchResultFragments={elementsResult}
        isQueryStale={searchElementsQueryResult.stale}
        isQueryFetching={searchElementsQueryResult.fetching}
        onSearchTextChange={onSearchTextChange}
        onClearHistory={onClearHistory}
        onEndReached={onEndReached}
      ></LibraryElements>
    </Box>
  );
};
