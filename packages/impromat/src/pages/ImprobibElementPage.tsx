import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { WorkshopElementComponent } from "../components/WorkshopElementComponent";
import { ElementDocType } from "../database/collections/element/element-collection";
import { useImprobibElements } from "../database/improbib/use-improbib-elements";
import { useDocument } from "../database/use-document";
import { useMyUser } from "../database/use-my-user";
import { useRxdbMutations } from "../database/use-rxdb-mutations";
import { routeWorkshopAddElement } from "../routes/shared-routes";
import { useComponentLogger } from "../use-component-logger";
import { useStateChangeLogger } from "../use-state-change-logger";

export const ImprobibElementPage: React.FC = () => {
  const { id: workshopId, libraryPartId } = useParams<{
    id?: string;
    libraryPartId: string;
  }>();
  const logger = useComponentLogger("ImprobibElementPage");
  useStateChangeLogger(workshopId, "workshopId", logger);
  useStateChangeLogger(libraryPartId, "libraryPartId", logger);
  const mutations = useRxdbMutations();
  const [presentToast] = useIonToast();
  const improbibElements = useImprobibElements();
  const [improbibElement, setImprobibElement] = useState<ElementDocType>();
  const history = useHistory();
  const { document: myUser } = useMyUser();
  const isFavoriteElement = useMemo(
    () => myUser?.favoriteElements.includes(libraryPartId),
    [myUser?.favoriteElements, libraryPartId],
  );
  const { document: documentElement } = useDocument("elements", libraryPartId);

  useEffect(() => {
    // TODO differentiate between improbib and custom elements
    // TODO cleanest is to synchronize improbib through the database
    // TODO hybrid approach would be save the improbib element in the database when opening up the page
    if (documentElement) {
      setImprobibElement(documentElement);
    }
  }, [documentElement]);

  useEffect(() => {
    if (!improbibElements) return;
    const result = improbibElements.find(
      (element) => element.id === libraryPartId,
    );
    if (result) setImprobibElement(result);
  }, [improbibElements, libraryPartId]);

  function addToWorkshop() {
    if (!mutations || !workshopId) return;
    const element = documentElement
      ? documentElement.toMutableJSON()
      : improbibElement;
    if (!element) return;
    if (improbibElement && !documentElement) {
      mutations.ensureElementExists(improbibElement);
    }
    mutations
      .addNewElementToWorkshop(workshopId, element.id, element)
      .then((elementId) => {
        history.push(`/workshop/${workshopId}`, {
          direction: "back",
          newElement: elementId,
        });
      });
  }

  function onStarElementClick() {
    if (!myUser) {
      // TODO test if the user exists in the database as query
      // currently, the query is just stuck because isFetching will not switch to `false`
      presentToast("Login to use the favorite function.", 1000);
      return;
    }
    if (
      !mutations ||
      !myUser ||
      isFavoriteElement === undefined ||
      !improbibElement
    )
      return;
    logger("onStarElementClick - isFavoriteElement: %s", isFavoriteElement);
    mutations.addNewElement(improbibElement);
    mutations.toggleFavoriteElementOfUser(myUser, libraryPartId);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={routeWorkshopAddElement(workshopId)}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{improbibElement?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onStarElementClick()}>
              <IonIcon
                slot="icon-only"
                icon={isFavoriteElement ? star : starOutline}
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {improbibElement ? (
          <WorkshopElementComponent
            element={improbibElement}
          ></WorkshopElementComponent>
        ) : (
          <IonSpinner></IonSpinner>
        )}
      </IonContent>
      {workshopId && (
        <IonFooter>
          <IonToolbar>
            <IonButton
              onClick={() => {
                addToWorkshop();
              }}
              color="primary"
              expand="full"
              fill="solid"
            >
              Add to Workshop
            </IonButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};
