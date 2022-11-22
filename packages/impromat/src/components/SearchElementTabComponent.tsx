import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSpinner,
  IonText,
} from "@ionic/react";
import Fuse from "fuse.js";
import { informationCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  routeWorkshopAddElementCreate,
  routeWorkshopAddElementFromImprobib,
} from "../routes/shared-routes";
import { ElementDocType } from "../database/collections/element/element-collection";
import { useImprobibElements } from "../database/improbib/use-improbib-elements";
import { InfoItemComponent } from "./InfoItemComponent";
import { WorkshopElementPreviewItemComponent } from "./WorkshopElementPreviewItemComponent";

export const SearchElementTabComponent: React.FC = () => {
  const { id: workshopId } = useParams<{
    id: string;
  }>();
  const improvElements = useImprobibElements();
  const [loadingImprovElements, setLoadingImprovElements] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [workshopElements, setWorkshopElements] = useState<ElementDocType[]>();
  const [fuse, setFuse] = useState<Fuse<ElementDocType>>();
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    setLoadingImprovElements(improvElements === undefined);
    if (improvElements) {
      setFuse(
        new Fuse(improvElements, {
          keys: ["name", "tags", { name: "markdown", weight: 0.5 }],
          threshold: 0.6,
        }),
      );
    }
  }, [improvElements]);

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
              <IonItem lines="none">
                <IonLabel>
                  <IonButton
                    expand="full"
                    routerLink={routeWorkshopAddElementCreate(workshopId)}
                  >
                    Create Element
                  </IonButton>
                </IonLabel>
              </IonItem>
            </IonList>
          ) : (
            !!workshopElements?.length && (
              <IonList>
                {workshopElements?.map((element) => (
                  <WorkshopElementPreviewItemComponent
                    key={element.id}
                    routerLink={routeWorkshopAddElementFromImprobib(
                      workshopId,
                      element.id,
                    )}
                    workshopElement={element}
                  ></WorkshopElementPreviewItemComponent>
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
