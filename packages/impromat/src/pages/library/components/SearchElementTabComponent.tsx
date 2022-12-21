import { IonList, IonSearchbar, IonSpinner, IonText } from "@ionic/react";
import Fuse from "fuse.js";
import { informationCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { ElementPreviewItemComponent } from "../../../components/ElementPreviewItemComponent";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import { ElementDocType } from "../../../database/collections/element/element-collection";
import { useImprobibElements } from "../../../database/improbib/use-improbib-elements";
import { useCustomElements } from "../../../database/use-custom-elements";
import { routeLibraryElement } from "../library-routes";

interface ContainerProps {
  workshopId?: string;
}

/**
 * Search for a specific workshop element. Search includes all elements from the improbib and all custom elements.
 */
export const SearchElementTabComponent: React.FC<ContainerProps> = ({
  workshopId,
}) => {
  const improbibElements = useImprobibElements();
  const [loadingImprovElements, setLoadingImprovElements] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [workshopElements, setWorkshopElements] = useState<ElementDocType[]>();
  const [fuse, setFuse] = useState<Fuse<ElementDocType>>();
  const [isSearching, setIsSearching] = useState(true);
  const { customElements, isFetching: isCustomElementsFetching } =
    useCustomElements();

  useEffect(() => {
    setLoadingImprovElements(improbibElements === undefined);
    if (improbibElements && customElements && !isCustomElementsFetching) {
      setFuse(
        new Fuse([...improbibElements, ...customElements], {
          keys: ["name", "tags", { name: "markdown", weight: 0.5 }],
          threshold: 0.6,
        }),
      );
    } else {
      setFuse(undefined);
    }
  }, [improbibElements, customElements, isCustomElementsFetching]);

  useEffect(() => {
    if (!fuse) return;

    (async () => {
      setWorkshopElements(
        fuse
          .search(searchText)
          .map((result) => result.item)
          .slice(0, 20),
      );
    })();
    setIsSearching(false);
  }, [searchText, fuse]);

  useEffect(() => {
    const lastSearch = window.localStorage.getItem("lastSearch");
    if (lastSearch) {
      setSearchText(lastSearch);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lastSearch", searchText);
  }, [searchText]);

  return (
    <>
      <IonSearchbar
        debounce={500}
        disabled={loadingImprovElements}
        value={searchText}
        onIonChange={(e) => {
          setIsSearching(true);
          setSearchText(e.detail.value ?? "");
        }}
      ></IonSearchbar>
      {loadingImprovElements ? (
        <div className="ion-padding" style={{ textAlign: "center" }}>
          <IonSpinner></IonSpinner>
          <p>
            <IonText>Loading Improv Database</IonText>
          </p>
        </div>
      ) : (
        <>
          {!isSearching && !workshopElements?.length && searchText.length ? (
            <IonList>
              <InfoItemComponent
                message="No matching elements found."
                icon={informationCircle}
                color="warning"
              ></InfoItemComponent>
            </IonList>
          ) : (
            !!workshopElements?.length && (
              <IonList>
                {workshopElements?.map((element) => (
                  <ElementPreviewItemComponent
                    key={element.id}
                    routerLink={routeLibraryElement(element.id, { workshopId })}
                    workshopElement={element}
                  ></ElementPreviewItemComponent>
                ))}
              </IonList>
            )
          )}
          {!workshopElements?.length && !searchText.length && (
            <InfoItemComponent
              message={
                "Use the search bar to find elements from various sources."
              }
              icon={informationCircle}
            ></InfoItemComponent>
          )}
        </>
      )}
    </>
  );
};
