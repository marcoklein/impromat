import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
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
  // Known issue with the search bar: sometimes inputs "hang up" if you type too fast.
  // Therefore, a `ref` is used to set the initial value only.
  const [searchText, setSearchText] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    console.log("start", pageNumber);

    return () => {
      console.log("cleanup");
    };
  }, [pageNumber]);

  const [searchElementsQueryResult] = useQuery({
    query: SearchElementTabQuery,
    variables: {
      input: {
        text: searchText,
      },
      skip: pageNumber * 20,
      take: 20,
    },
  });

  return (
    <>
      <ElementSearchBarComponent
        onSearchTextChange={(text) => setSearchText(text)}
      ></ElementSearchBarComponent>
      <IonContent scrollY={true} className="ion-no-padding ion-no-margin">
        {!searchElementsQueryResult.fetching &&
          !searchElementsQueryResult.data?.searchElements.length &&
          searchText.length && (
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
                  if (!searchElementsQueryResult.fetching) {
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
        {!searchElementsQueryResult.data?.searchElements.length &&
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
