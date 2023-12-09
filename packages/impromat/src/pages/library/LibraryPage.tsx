import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonList,
  IonProgressBar,
  IonToolbar,
} from "@ionic/react";
import { chevronUp, filter, informationCircle } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";
import { ElementPreviewCard } from "../../components/ElementPreviewCard";
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { usePersistedState } from "../../hooks/use-persisted-state";
import { routeLibraryElement } from "../../routes/library-routes";
import { ElementFilterBar } from "./components/ElementFilterBar";
import { FilterInspirations } from "./components/FilterInspirations";
import { NewElementButton } from "./components/NewElementButton";
import { Steps, Hints } from "intro.js-react";

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
  const { t, i18n } = useTranslation("LibraryPage");

  const [selectedLanguage, setSelectedLanguage] = usePersistedState<string>(
    "lastSelectedLanguage",
    i18n.language.split("-")[0],
  );
  const [selectedTagNames, setSelectedTagNames] = usePersistedState<string[]>(
    "lastSelectedTags",
    [],
  );
  const [additionalFilter, setAdditionalFilter] = usePersistedState<{
    liked: boolean;
    userCreated: boolean;
  }>("lastAdditionalFilter", { liked: false, userCreated: false });

  const [searchText, setSearchText] = usePersistedState<string>(
    "lastSearch",
    "",
  );
  const isEmptyFilter = useMemo(
    () =>
      !searchText.trim() &&
      !selectedTagNames.length &&
      !additionalFilter.liked &&
      !additionalFilter.userCreated,
    [searchText, selectedTagNames, additionalFilter],
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [scrollToTop, setScrollToTop] = useState(0);
  const { isLoggedIn } = useIsLoggedIn();

  const itemsPerPage = 20;

  const trimmedSearchText = useMemo(() => searchText.trim(), [searchText]);

  const [searchElementsQueryResult, reexecuteSearchElementsQuery] = useQuery({
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
  const foldedFilterBarHeight = 80;

  const [keepFilterBarOpen, setKeepFilterBarOpen] = usePersistedState<boolean>(
    "keepFilterBarOpen",
    false,
  );

  const [stepsEnabled, setStepsEnabled] = useState(false);
  // enable steps after 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStepsEnabled(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <PageScaffold
      customContentWrapper
      secondaryToolbar={
        <IonToolbar className="ion-no-margin ion-no-padding">
          {searchElementsQueryResult.data && (
            <>
              <div
                style={{
                  overflow: "auto",
                  maxHeight: isFilterBarExpanded
                    ? "55vh"
                    : `${foldedFilterBarHeight}px`,
                }}
                className="FilterBarContainer"
              >
                <ElementFilterBar
                  enableUserSpecificFilters={isLoggedIn}
                  onLanguageChange={(language) => {
                    resetScroll();
                    setSelectedLanguage(language);
                  }}
                  selectedLanguage={selectedLanguage}
                  selectedTagNames={selectedTagNames}
                  onTagsChange={(selectedTagNames) => {
                    resetScroll();
                    setSelectedTagNames(selectedTagNames);
                    if (keepFilterBarOpen) return;
                    setIsFilterBarExpanded(false);
                  }}
                  additionalFilter={additionalFilter}
                  onAdditionalFilterChange={(additionalFilter) => {
                    resetScroll();
                    setAdditionalFilter(additionalFilter);
                    if (keepFilterBarOpen) return;
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
              </div>
              {!isFilterBarExpanded && (
                <div
                  style={{
                    position: "absolute",
                    right: "14px",
                    bottom: "2px",
                  }}
                >
                  <IonButton
                    fill="solid"
                    shape="round"
                    size="small"
                    onClick={() =>
                      setIsFilterBarExpanded((expanded) => !expanded)
                    }
                  >
                    <IonIcon slot="icon-only" icon={filter}></IonIcon>
                  </IonButton>
                </div>
              )}
              {isFilterBarExpanded && (
                <div
                  className="ion-margin-horizontal"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IonCheckbox
                    labelPlacement="start"
                    checked={keepFilterBarOpen}
                    onIonChange={(event) =>
                      setKeepFilterBarOpen(event.detail.checked)
                    }
                  >
                    {t("Keep filter expanded")}
                  </IonCheckbox>
                  <div style={{ flex: 1 }}></div>
                  <IonButton
                    className="FilterBarCollapseButton"
                    fill="outline"
                    expand="full"
                    shape="round"
                    size="small"
                    onClick={() =>
                      setIsFilterBarExpanded((expanded) => !expanded)
                    }
                  >
                    <IonIcon slot="icon-only" icon={chevronUp}></IonIcon>
                  </IonButton>
                </div>
              )}
              <div>
                {(searchElementsQueryResult.stale ||
                  searchElementsQueryResult.fetching) && (
                  <IonProgressBar
                    type="indeterminate"
                    color="dark"
                  ></IonProgressBar>
                )}
              </div>
            </>
          )}
        </IonToolbar>
      }
    >
      <IonContent scrollY={false} className="ion-no-padding ion-no-margin">
        <Steps
          enabled={stepsEnabled}
          initialStep={0}
          steps={[
            {
              element: ".FilterBarContainer",
              position: "bottom",
              intro: t(
                "Use the filter bar to search for elements from various sources.",
              ),
            },
            // {
            //   element: ".element-preview-card",
            //   intro: t(
            //     "Click on an element to see more details and to use it in your own projects.",
            //   ),
            // },
            // {
            //   element: ".new-element-button",
            //   intro: t(
            //     "Click here to create your own element and share it with the community.",
            //   ),
            // },
          ]}
          onExit={() => {
            setStepsEnabled(false);
          }}
        ></Steps>
        <Hints
          enabled={stepsEnabled}
          hints={[
            {
              element: ".element-filter-bar",
              hint: "Click on an element to see more details and to use it in your own projects.",
            },
            {
              element: ".NewElementButton",
              hint: "Click here to create your own element and share it with the community.",
            },
          ]}
        ></Hints>
        <PageContentLoaderComponent
          queryResult={searchElementsQueryResult}
          reexecuteQuery={reexecuteSearchElementsQuery}
        >
          {isLoggedIn && <NewElementButton></NewElementButton>}
          {!searchElementsQueryResult.stale &&
            !searchElementsQueryResult.fetching &&
            !searchElementsQueryResult.data?.searchElements.length &&
            searchText.length > 0 && (
              <IonList>
                <InfoItemComponent
                  message={t("No matching elements found.")}
                  icon={informationCircle}
                  color="warning"
                ></InfoItemComponent>
              </IonList>
            )}
          {isEmptyFilter && (
            <FilterInspirations
              filterLanguage={selectedLanguage}
              onTagsChange={(tags) => setSelectedTagNames(tags)}
            ></FilterInspirations>
          )}
          {!isEmptyFilter &&
            searchElementsQueryResult.data &&
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
                message={t(
                  "Use the search bar to find elements from various sources.",
                )}
                icon={informationCircle}
              ></InfoItemComponent>
            )}
        </PageContentLoaderComponent>
      </IonContent>
    </PageScaffold>
  );
};
