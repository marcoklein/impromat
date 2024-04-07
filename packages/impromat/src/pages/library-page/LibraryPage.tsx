import Box from "@mui/material/Box";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useQuery } from "urql";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { graphql } from "../../graphql-client";
import { useDebounce } from "../../hooks/use-debounce";
import { usePersistedState } from "../../hooks/use-persisted-state";
import { useSearchParam } from "../../hooks/use-search-params";
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

export const LibraryPage: React.FC = () => {
  const { i18n } = useTranslation("LibraryPage");

  const searchParameterFromUrl = useSearchParam(ROUTE_LIBRARY_SEARCH_PARAM);

  const [searchText, setSearchText] = usePersistedState<string>(
    "lastSearch",
    "",
    { forceValue: searchParameterFromUrl },
  );
  const [triggerNow, setTriggerNow] = useState<number>(0);
  const debouncedSearchText = useDebounce(searchText, 500, triggerNow);

  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams();
    params.append(ROUTE_LIBRARY_SEARCH_PARAM, searchText);
    history.push({ search: params.toString() });
  }, [history, searchText]);

  const [loadedSearchTextFromParam, setLoadedSearchTextFromParam] =
    useState<boolean>();

  useEffect(() => {
    if (searchParameterFromUrl && !loadedSearchTextFromParam) {
      setSearchText(searchParameterFromUrl);
      setLoadedSearchTextFromParam(true);
    }
  }, [loadedSearchTextFromParam, searchParameterFromUrl, setSearchText]);

  const [selectedLanguages, setSelectedLanguages] = usePersistedState<string[]>(
    "lastSelectedLanguages",
    [i18n.language.split("-")[0]],
  );
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 7;

  const [searchElementsQueryResult, reexecuteSearchElementsQuery] = useQuery({
    query: MuiLibraryPageQuery,
    pause: useMemo(() => !debouncedSearchText.length, [debouncedSearchText]),
    variables: {
      input: {
        languageCodes: selectedLanguages,
        ...parseSearchInput(debouncedSearchText),
      },
      skip: pageNumber * itemsPerPage,
      take: itemsPerPage,
    },
  });
  const elementsResult = useMemo(
    () =>
      !searchText.length ? [] : searchElementsQueryResult.data?.searchElements,
    [searchElementsQueryResult.data?.searchElements, searchText],
  );

  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(0);

  const resetScroll = useCallback(() => {
    setPageNumber(0);
    setScrollToTop((current) => current + 1);
  }, []);

  useEffect(() => {
    resetScroll();
  }, [searchText, selectedLanguages, resetScroll]);

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
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={() => setTriggerNow((current) => current + 1)}
        queryIsFetching={searchElementsQueryResult.fetching}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        reexecuteSearchElementsQuery={reexecuteSearchElementsQuery}
        menuDialogOpen={menuDialogOpen}
        setMenuDialogOpen={setMenuDialogOpen}
      ></LibraryPageAppBar>
      <QueryErrorAlert
        error={searchElementsQueryResult.error}
        onRetry={() => reexecuteSearchElementsQuery()}
      />
      <IsLoggedIn>
        <NewElementButton />
      </IsLoggedIn>
      <LibraryElements
        pageNumber={pageNumber}
        onSearchTextChange={setSearchText}
        setPageNumber={setPageNumber}
        scrollToTop={scrollToTop}
        elementSearchResultFragments={elementsResult}
        isQueryStale={searchElementsQueryResult.stale}
        isQueryFetching={searchElementsQueryResult.fetching}
      ></LibraryElements>
    </Box>
  );
};
