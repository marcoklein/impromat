import { IonContent, IonList, IonSpinner } from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import { useState } from "react";
import { useQuery } from "urql";
import { CardGridComponent } from "../../../components/CardGridComponent";
import { CardGridRowComponent } from "../../../components/CardGridRowComponent";
import { ElementPreviewItemComponent } from "../../../components/ElementPreviewItemComponent";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import { graphql } from "../../../graphql-client";
import { routeLibraryElement } from "../library-routes";
import { ElementSearchBarComponent } from "./ElementSearchBarComponent";

const SearchElementTabQuery = graphql(`
  query SearchElements($input: ElementSearchInput!) {
    searchElements(input: $input) {
      element {
        id
        ...ElementPreviewItem_Element
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

  const [queryResult] = useQuery({
    query: SearchElementTabQuery,
    variables: { input: { text: searchText, limit: 20 } },
  });

  function SearchContent() {
    if (
      !queryResult.fetching &&
      !queryResult.data?.searchElements.length &&
      searchText.length
    ) {
      return (
        <IonList>
          <InfoItemComponent
            message="No matching elements found."
            icon={informationCircle}
            color="warning"
          ></InfoItemComponent>
        </IonList>
      );
    }
    if (!!queryResult.data?.searchElements.length) {
      return (
        <CardGridComponent>
          {queryResult.data.searchElements.map((searchResult) => (
            <CardGridRowComponent key={searchResult.element.id}>
              <ElementPreviewItemComponent
                routerLink={routeLibraryElement(searchResult.element.id, {
                  workshopId,
                })}
                workshopElementFragment={searchResult.element}
              ></ElementPreviewItemComponent>
            </CardGridRowComponent>
          ))}
        </CardGridComponent>
      );
    }
    if (!queryResult.data?.searchElements.length && !searchText.length) {
      return (
        <InfoItemComponent
          message={"Use the search bar to find elements from various sources."}
          icon={informationCircle}
        ></InfoItemComponent>
      );
    }
    return <IonSpinner></IonSpinner>;
  }

  return (
    <>
      <ElementSearchBarComponent
        onSearchTextChange={(text) => setSearchText(text)}
      ></ElementSearchBarComponent>
      <IonContent>
        <SearchContent></SearchContent>
      </IonContent>
    </>
  );
};
