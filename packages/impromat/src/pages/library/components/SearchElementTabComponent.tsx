import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonLoading,
  IonProgressBar,
  IonSpinner,
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import { useMemo, useState } from "react";
import { useQuery } from "urql";
import { CardGridComponent } from "../../../components/CardGridComponent";
import { CardGridRowComponent } from "../../../components/CardGridRowComponent";
import { ElementPreviewItemComponent } from "../../../components/ElementPreviewItemComponent";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import { graphql } from "../../../graphql-client";
import { routeLibraryElement } from "../library-routes";
import { ElementSearchBarComponent } from "./ElementSearchBarComponent";

const SearchElementTabQuery = graphql(`
  query SearchElements($input: ElementSearchInput!, $skip: Int!, $take: Int!) {
    searchElements(input: $input, skip: $skip, take: $take) {
      element {
        id
        ...ElementPreviewItem_Element
      }
      score
      matches {
        key
        indices
        refIndex
        value
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
  const [searchText, setSearchText] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(0);
  const context = useMemo(() => ({ additionalTypenames: ["Element"] }), []);

  const [searchElementsQueryResult] = useQuery({
    query: SearchElementTabQuery,
    variables: {
      input: {
        text: searchText,
      },
      skip: pageNumber * 20,
      take: 20,
    },
    context,
  });

  return (
    <>
      <ElementSearchBarComponent
        onSearchTextChange={(text) => setSearchText(text)}
      ></ElementSearchBarComponent>
      <div>
        {(searchElementsQueryResult.stale ||
          searchElementsQueryResult.fetching) && (
          <IonProgressBar type="indeterminate" color="dark"></IonProgressBar>
        )}
      </div>
      <IonContent scrollY={true} className="ion-no-padding ion-no-margin">
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
            <>
              {/* add Virtuoso for faster rendering of components */}
              <CardGridComponent>
                {searchElementsQueryResult.data.searchElements.map(
                  (searchResult) => (
                    <CardGridRowComponent key={searchResult.element.id}>
                      {/* <div>{JSON.stringify(searchResult.matches)}</div> */}
                      <ElementPreviewItemComponent
                        routerLink={routeLibraryElement(
                          searchResult.element.id,
                          {
                            workshopId,
                          },
                        )}
                        workshopElementFragment={searchResult.element}
                      ></ElementPreviewItemComponent>
                    </CardGridRowComponent>
                  ),
                )}
              </CardGridComponent>
              <IonInfiniteScroll
                onIonInfinite={(ev) => {
                  if (!searchElementsQueryResult.stale) {
                    setPageNumber((currentPageNumber) => currentPageNumber + 1);
                    setTimeout(() => ev.target.complete(), 500);
                  } else {
                    ev.target.complete();
                  }
                }}
              >
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </>
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
