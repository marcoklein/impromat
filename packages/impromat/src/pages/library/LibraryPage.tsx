import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useSearchParam } from "../../hooks/use-search-params";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { routeWorkshop } from "../../routes/shared-routes";
import { SearchElementTabComponent } from "./components/SearchElementTabComponent";
import { WORKSHOP_CONTEXT_SEARCH_PARAM } from "./workshop-context-search-param";

export const LibraryPage: React.FC = () => {
  const workshopId = useSearchParam(WORKSHOP_CONTEXT_SEARCH_PARAM);
  const logger = useComponentLogger("LibraryPage");
  useStateChangeLogger(workshopId, "workshopId from params", logger);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {workshopId ? (
              <IonButton
                routerLink={routeWorkshop(workshopId)}
                routerDirection="back"
              >
                <IonIcon icon={arrowBack} slot="icon-only"></IonIcon>
              </IonButton>
            ) : (
              <IonMenuButton></IonMenuButton>
            )}
          </IonButtons>
          <IonTitle>{workshopId ? "Add Element" : "Element Library"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <SearchElementTabComponent
        workshopId={workshopId}
      ></SearchElementTabComponent>
    </IonPage>
  );
};
