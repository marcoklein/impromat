import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { graphql } from "../../graphql-client";
import { usePersistedState } from "../../hooks/use-persisted-state";
import { LibraryElements } from "./LibraryElements";
import { LibraryPageAppBar } from "./LibraryPageAppBar";
import { NewElementButton } from "./NewElementButton";
import { QueryErrorAlert } from "./QueryErrorAlert";

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

  const [selectedLanguage, setSelectedLanguage] = usePersistedState<string>(
    "lastSelectedLanguage",
    i18n.language.split("-")[0],
  );

  const [searchText, setSearchText] = usePersistedState<string>(
    "lastSearch",
    "",
  );

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 20;

  const [searchElementsQueryResult, reexecuteSearchElementsQuery] = useQuery({
    query: MuiLibraryPageQuery,
    variables: {
      input: {
        text: searchText,
        languageCodes: [selectedLanguage],
      },
      skip: pageNumber * itemsPerPage,
      take: itemsPerPage,
    },
  });

  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(0);

  const resetScroll = useCallback(() => {
    setPageNumber(0);
    setScrollToTop((current) => current + 1);
  }, []);

  useEffect(() => {
    resetScroll();
  }, [searchText, selectedLanguage, resetScroll]);

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
        onSearch={(text) => {
          setSearchText(text);
        }}
        queryIsFetching={searchElementsQueryResult.fetching}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
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
        setPageNumber={setPageNumber}
        scrollToTop={scrollToTop}
        elementSearchResultFragments={
          searchElementsQueryResult.data?.searchElements
        }
        isQueryStale={searchElementsQueryResult.stale}
        isQueryFetching={searchElementsQueryResult.fetching}
      ></LibraryElements>
    </Box>
  );
};
