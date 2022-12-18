import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import {
  routeLibraryCreateCustomElement,
  routeWorkshopAddElementCreateCustomElement,
} from "../../routes/shared-routes";
import { useComponentLogger } from "../../use-component-logger";
import { CustomElementsEmptyComponent } from "../custom-elements/CustomElementsEmptyComponent";

export const CreateElementTabComponent: React.FC = () => {
  const { id: workshopId } = useParams<{
    id?: string;
  }>();

  const location = useLocation();
  const logger = useComponentLogger("CreateElementTabComponent");

  useEffect(() => {
    logger("location=%s", location.pathname);
    logger("state=%O", location.state);
  }, [location, logger]);

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton
          color="primary"
          routerLink={
            workshopId
              ? routeWorkshopAddElementCreateCustomElement(workshopId)
              : routeLibraryCreateCustomElement()
          }
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <CustomElementsEmptyComponent></CustomElementsEmptyComponent>
    </>
  );
};
