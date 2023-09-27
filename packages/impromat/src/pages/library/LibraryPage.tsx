import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonProgressBar,
} from "@ionic/react";
import { add, caretDown, caretUp, informationCircle } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "urql";
import { ElementPreviewCard } from "../../components/ElementPreviewCard";
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { usePersistedState } from "../../hooks/use-persisted-state";
import {
  routeLibraryCreateCustomElement,
  routeLibraryElement,
} from "../../routes/library-routes";
import { ElementFilterBar } from "./components/ElementFilterBar";

const LibraryPageQuery = graphql(`
  query SearchElements(
    $input: ElementSearchInput!
    $elementFilterBarInput: ElementTagsFilterInput!
    $skip: Int!
    $take: Int!
  ) {
    searchElements(input: $input, skip: $skip, take: $take) {
      element {
        id
        ...ElementPreviewItem_Element
      }
      ...ElementPreviewItem_ElementSearchResult
    }
    ...ElementFilterBar_Query
  }
`);

export const LibraryPage: React.FC = () => {
  const logger = useComponentLogger("LibraryPage");
  const [restoredSearchText] = useState(
    window.localStorage.getItem("lastSearch") ?? "",
  );

  const [selectedLanguage, setSelectedLanguage] = usePersistedState<string>(
    "lastSelectedLanguage",
    "en", // TODO get available languages from user profile
  );
  const [selectedTagNames, setSelectedTagNames] = usePersistedState<string[]>(
    "lastSelectedTags",
    [],
  );
  const [additionalFilter, setAdditionalFilter] = usePersistedState<{
    liked: boolean;
    userCreated: boolean;
  }>("lastAdditionalFilter", { liked: false, userCreated: false });

  const [searchText, setSearchText] = useState(restoredSearchText);
  const [pageNumber, setPageNumber] = useState(0);
  const [scrollToTop, setScrollToTop] = useState(0);

  const itemsPerPage = 20;

  const trimmedSearchText = useMemo(() => searchText.trim(), [searchText]);

  const [searchElementsQueryResult] = useQuery({
    query: LibraryPageQuery,
    variables: {
      input: {
        text: trimmedSearchText,
        tagNames: selectedTagNames,
        languageCode: selectedLanguage,
        isLiked: additionalFilter.liked,
        isOwned: additionalFilter.userCreated,
      },
      elementFilterBarInput: {
        selectedTagNames: selectedTagNames,
        languageCode: selectedLanguage,
      },
      skip: pageNumber * itemsPerPage,
      take: itemsPerPage,
    },
  });

  const resetScroll = () => {
    setScrollToTop((current) => current + 1);
    setPageNumber(0);
  };

  useEffect(() => {
    const actualSkip = searchElementsQueryResult.data?.searchElements.length;
    if (!actualSkip) return;
    const actualPageNumber = Math.floor(actualSkip / itemsPerPage) - 1;
    logger(
      "actual page number=%s, current page number=%s",
      actualPageNumber,
      pageNumber,
    );
    if (pageNumber < actualPageNumber) {
      logger(
        "Correcting page number (actualPageNumber=%s, currentPageNumber=%s) as cached entities got retrieved.",
        actualPageNumber,
        pageNumber,
      );
      setPageNumber(actualPageNumber);
    }
  }, [pageNumber, searchElementsQueryResult, logger]);

  const [isFilterBarExpanded, setIsFilterBarExpanded] = useState(false);

  return (
    <PageScaffold customContentWrapper title="Exercises & Games">
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            overflow: "auto",
            height: isFilterBarExpanded ? "100%" : "40px",
            maxHeight: "60vh",
          }}
          className="side-scrolling-list"
        >
          {searchElementsQueryResult.data && (
            <ElementFilterBar
              onLanguageChange={(language) => {
                resetScroll();
                setSelectedLanguage(language);
              }}
              selectedLanguage={selectedLanguage}
              selectedTagNames={selectedTagNames}
              onTagsChange={(selectedTagNames) => {
                resetScroll();
                setSelectedTagNames(selectedTagNames);
                setIsFilterBarExpanded(false);
              }}
              additionalFilter={additionalFilter}
              onAdditionalFilterChange={(additionalFilter) => {
                resetScroll();
                setAdditionalFilter(additionalFilter);
                setIsFilterBarExpanded(false);
              }}
              queryFragment={searchElementsQueryResult.data}
              loadingAvailableTags={
                searchElementsQueryResult.fetching ||
                searchElementsQueryResult.stale
              }
              isExpanded={isFilterBarExpanded}
              searchInput={searchText}
              onSearchInputChange={(text) => {
                resetScroll();
                setSearchText(text);
              }}
            ></ElementFilterBar>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            right: "10px",
            bottom: "0px",
          }}
        >
          <IonButton
            fill="solid"
            size="small"
            color="secondary"
            onClick={() => setIsFilterBarExpanded((expanded) => !expanded)}
          >
            <IonIcon
              slot="icon-only"
              icon={isFilterBarExpanded ? caretUp : caretDown}
            ></IonIcon>
          </IonButton>
        </div>
      </div>
      <div>
        {(searchElementsQueryResult.stale ||
          searchElementsQueryResult.fetching) && (
          <IonProgressBar type="indeterminate" color="dark"></IonProgressBar>
        )}
      </div>
      <IonContent scrollY={false} className="ion-no-padding ion-no-margin">
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton
            color="primary"
            routerLink={routeLibraryCreateCustomElement()}
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        {!searchElementsQueryResult.stale &&
          !searchElementsQueryResult.fetching &&
          !searchElementsQueryResult.data?.searchElements.length &&
          searchText.length > 0 && (
            <IonList>
              <InfoItemComponent
                message="No matching elements found."
                icon={informationCircle}
                color="warning"
              ></InfoItemComponent>
            </IonList>
          )}
        {searchElementsQueryResult.data &&
          searchElementsQueryResult.data.searchElements.length > 0 && (
            <VirtualCardGrid
              scrollStoreKey="search-element-tab-component"
              isFetching={
                searchElementsQueryResult.fetching ||
                searchElementsQueryResult.stale
              }
              scrollToTop={scrollToTop}
              endReached={() => {
                logger(
                  "end reached, queryResult.stale=%s",
                  searchElementsQueryResult.stale,
                );
                if (!searchElementsQueryResult.stale) {
                  setPageNumber((currentPageNumber) => currentPageNumber + 1);
                  logger("setting page number to %s", pageNumber + 1);
                }
              }}
              items={searchElementsQueryResult.data.searchElements ?? []}
              itemContent={(_index, searchResult) => (
                <ElementPreviewCard
                  routerLink={routeLibraryElement(searchResult.element.id)}
                  elementFragment={searchResult.element}
                  elementSearchResultFragment={searchResult}
                ></ElementPreviewCard>
              )}
            ></VirtualCardGrid>
          )}
        {!searchElementsQueryResult.fetching &&
          !searchElementsQueryResult.stale &&
          !searchElementsQueryResult.data?.searchElements.length &&
          !searchText.length && (
            <InfoItemComponent
              message={
                "Use the search bar to find elements from various sources."
              }
              icon={informationCircle}
            ></InfoItemComponent>
          )}
      </IonContent>
    </PageScaffold>
  );
};
