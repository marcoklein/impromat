import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonProgressBar,
} from "@ionic/react";
import { add, informationCircle } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "urql";
import { ElementPreviewCard } from "../../../components/ElementPreviewCard";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import { graphql } from "../../../graphql-client";
import {
  routeLibraryCreateCustomElement,
  routeLibraryElement,
} from "../library-routes";
import { ElementSearchBarComponent } from "./ElementSearchBarComponent";

import { VirtualCardGrid } from "../../../components/VirtualCardGrid";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { ElementFilterBar } from "./ElementFilterBar";

const SearchElementTabQuery = graphql(`
  query SearchElements($input: ElementSearchInput!, $skip: Int!, $take: Int!) {
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

interface ContainerProps {
  workshopId?: string;
}

/**
 * Search for a specific workshop element. Search includes all elements from the improbib and all custom elements.
 */
export const SearchElementTabComponent: React.FC<ContainerProps> = ({
  workshopId,
}) => {
  const logger = useComponentLogger("SearchElementTabComponent");
  const [restoredSearchText] = useState(
    window.localStorage.getItem("lastSearch") ?? "",
  );
  const [searchText, setSearchText] = useState(restoredSearchText);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 20;

  const trimmedSearchText = useMemo(() => searchText.trim(), [searchText]);

  const [searchElementsQueryResult] = useQuery({
    query: SearchElementTabQuery,
    variables: {
      input: {
        text: trimmedSearchText,
      },
      skip: pageNumber * itemsPerPage,
      take: itemsPerPage,
    },
  });

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

  return (
    <>
      <ElementSearchBarComponent
        initialSearchText={restoredSearchText}
        onSearchTextChange={(text) => {
          setPageNumber(0);
          setSearchText(text);
          window.localStorage.setItem("lastSearch", text);
        }}
      ></ElementSearchBarComponent>
      <IonContent scrollY style={{ maxHeight: "5rem" }}>
        {searchElementsQueryResult.data && (
          <ElementFilterBar
            queryFragment={searchElementsQueryResult.data}
          ></ElementFilterBar>
        )}
      </IonContent>
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
            routerLink={routeLibraryCreateCustomElement({ workshopId })}
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
                  routerLink={routeLibraryElement(searchResult.element.id, {
                    workshopId,
                  })}
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
    </>
  );
};
