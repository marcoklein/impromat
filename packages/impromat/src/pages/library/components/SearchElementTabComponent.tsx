import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonProgressBar,
} from "@ionic/react";
import { add, informationCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { ElementPreviewCard } from "../../../components/ElementPreviewCard";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import { graphql } from "../../../graphql-client";
import { UserElementsFilterInput } from "../../../graphql-client/graphql";
import {
  routeLibraryCreateCustomElement,
  routeLibraryElement,
} from "../library-routes";
import { ElementSearchBarComponent } from "./ElementSearchBarComponent";

import { ElementsFilterBar } from "../../../components/ElementsFilterBar";
import { PreviewCardGrid } from "../../../components/PreviewCardGrid";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { usePersistedState } from "../../../hooks/use-persisted-state";

const SearchElementTabQuery = graphql(`
  query SearchElementTabQuery(
    $input: UserElementsFilterInput!
    $skip: Int!
    $take: Int!
  ) {
    me {
      elements(input: $input, skip: $skip, take: $take) {
        element {
          id
          ...ElementPreviewItem_Element
        }
        ...ElementPreviewItem_ElementSearchResult
      }
    }
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
  const [pageNumber, setPageNumber] = useState(0);

  const [userElementsFilterInput, setUserElementsFilterInput] =
    usePersistedState<UserElementsFilterInput>("user-elements-filter-input", {
      liked: true,
      owned: true,
      public: true,
      searchText: null,
    });
  const itemsPerPage = 20;

  const [searchElementsQueryResult] = useQuery({
    query: SearchElementTabQuery,
    variables: {
      input: userElementsFilterInput,
      skip: pageNumber * itemsPerPage,
      take: itemsPerPage,
    },
  });

  useEffect(() => {
    const actualSkip = searchElementsQueryResult.data?.me.elements.length;
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
        initialSearchText={userElementsFilterInput.searchText ?? ""}
        onSearchTextChange={(text) => {
          setPageNumber(0);
          setUserElementsFilterInput({
            ...userElementsFilterInput,
            ...{ searchText: text },
          });
        }}
      ></ElementSearchBarComponent>
      <ElementsFilterBar
        filterInput={userElementsFilterInput}
        onFilterInputChange={(filterInput) =>
          setUserElementsFilterInput(filterInput)
        }
      ></ElementsFilterBar>
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
          !searchElementsQueryResult.data?.me.elements.length &&
          userElementsFilterInput.searchText &&
          userElementsFilterInput.searchText.length > 0 && (
            <IonList>
              <InfoItemComponent
                message="No matching elements found."
                icon={informationCircle}
                color="warning"
              ></InfoItemComponent>
            </IonList>
          )}
        {searchElementsQueryResult.data &&
          searchElementsQueryResult.data.me.elements.length > 0 && (
            <PreviewCardGrid
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
              items={searchElementsQueryResult.data.me.elements ?? []}
              itemContent={(_index, searchResult) => (
                <ElementPreviewCard
                  routerLink={routeLibraryElement(searchResult.element.id, {
                    workshopId,
                  })}
                  elementFragment={searchResult.element}
                  elementSearchResultFragment={searchResult}
                ></ElementPreviewCard>
              )}
            ></PreviewCardGrid>
          )}
        {!searchElementsQueryResult.fetching &&
          !searchElementsQueryResult.stale &&
          !searchElementsQueryResult.data?.me.elements.length &&
          !(
            userElementsFilterInput.searchText &&
            userElementsFilterInput.searchText.length
          ) && (
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
