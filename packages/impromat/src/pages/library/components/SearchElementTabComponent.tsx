import { IonList, IonSearchbar, IonSpinner } from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "urql";
import { ElementPreviewItemComponent } from "../../../components/ElementPreviewItemComponent";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import { graphql } from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { routeLibraryElement } from "../library-routes";

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
  const logger = useComponentLogger("SearchElementTabComponent");
  const test = useRef<HTMLIonSearchbarElement>(null);
  const [searchText, setSearchText] = useState("");
  const [queryResult] = useQuery({
    query: SearchElementTabQuery,
    variables: { input: { text: searchText, limit: 20 } },
  });

  useEffect(() => {
    if (test.current) {
      const lastSearch = window.localStorage.getItem("lastSearch");
      // Known issue with the search bar: sometimes inputs "hang up" if you type too fast.
      // Therefore, a `ref` is used to set the initial value only.
      if (lastSearch) {
        test.current.value = lastSearch;
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lastSearch", searchText);
    logger("stored search: %s", searchText);
  }, [searchText, logger]);

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
        <IonList>
          {queryResult.data.searchElements.map((searchResult) => (
            <ElementPreviewItemComponent
              key={searchResult.element.id}
              routerLink={routeLibraryElement(searchResult.element.id, {
                workshopId,
              })}
              workshopElementFragment={searchResult.element}
            ></ElementPreviewItemComponent>
          ))}
        </IonList>
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
      <IonSearchbar
        ref={test}
        debounce={200}
        onIonChange={(e) => {
          setSearchText(e.detail.value ?? "");
        }}
      ></IonSearchbar>
      <SearchContent></SearchContent>
    </>
  );
};
