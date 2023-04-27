import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonList,
  IonProgressBar,
  IonSkeletonText,
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import { useMemo, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { useQuery } from "urql";
import { ElementPreviewItemComponent } from "../../../components/ElementPreviewItemComponent";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import { graphql } from "../../../graphql-client";
import { routeLibraryElement } from "../library-routes";
import { ElementSearchBarComponent } from "./ElementSearchBarComponent";

import "./SearchElementTabCompenent.css";

const SearchElementTabQuery = graphql(`
  query SearchElements($input: ElementSearchInput!, $skip: Int!, $take: Int!) {
    searchElements(input: $input, skip: $skip, take: $take) {
      element {
        id
        ...ElementPreviewItem_Element
      }
      ...ElementPreviewItem_ElementSearchResult
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

  const itemsPerPage = 20;

  const [searchElementsQueryResult] = useQuery({
    query: SearchElementTabQuery,
    variables: {
      input: {
        text: searchText,
      },
      skip: pageNumber * itemsPerPage,
      take: itemsPerPage,
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
      <IonContent scrollY={false} className="ion-no-padding ion-no-margin">
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
            <VirtuosoGrid
              className="ion-content-scroll-host"
              style={{ height: "100%" }}
              totalCount={pageNumber * itemsPerPage}
              endReached={() => {
                if (!searchElementsQueryResult.stale) {
                  setPageNumber((currentPageNumber) => currentPageNumber + 1);
                }
              }}
              overscan={200}
              data={searchElementsQueryResult.data.searchElements ?? []}
              itemClassName="item-class-name"
              listClassName="list-class-name"
              components={{
                ScrollSeekPlaceholder: (props) => (
                  <div
                    style={{
                      height: props.height,
                      width: props.width,
                      padding: "4px",
                    }}
                  >
                    <IonCard
                      className="ion-no-margin"
                      style={{ height: "100%" }}
                    >
                      <IonCardHeader>
                        <IonCardTitle>
                          <IonSkeletonText animated></IonSkeletonText>
                        </IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonSkeletonText animated></IonSkeletonText>
                      </IonCardContent>
                      <IonCardContent>
                        <IonSkeletonText animated></IonSkeletonText>
                      </IonCardContent>
                      <IonCardContent>
                        <IonSkeletonText animated></IonSkeletonText>
                      </IonCardContent>
                    </IonCard>
                  </div>
                ),
              }}
              itemContent={(_index, searchResult) => (
                <ElementPreviewItemComponent
                  routerLink={routeLibraryElement(searchResult.element.id, {
                    workshopId,
                  })}
                  elementFragment={searchResult.element}
                  elementSearchResultFragment={searchResult}
                ></ElementPreviewItemComponent>
              )}
              scrollSeekConfiguration={{
                enter: (velocity) => Math.abs(velocity) > 500,
                exit: (velocity) => Math.abs(velocity) < 30,
              }}
            ></VirtuosoGrid>
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
