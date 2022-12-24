import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonNote,
  IonSpinner,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import { useCustomElements } from "../../../database/use-custom-elements";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { routeLibraryCreateCustomElement } from "../library-routes";
import { CustomElementsEmptyComponent } from "./CustomElementsEmptyComponent";
import { CustomElementsListComponent } from "./CustomElementsListComponent";

interface ContainerProps {
  workshopId: string | undefined;
}

export const CustomElementsTabComponent: React.FC<ContainerProps> = ({
  workshopId,
}) => {
  const location = useLocation();
  const logger = useComponentLogger("CustomElementsTabComponent");

  const { customElements, isFetching } = useCustomElements();

  useEffect(() => {
    logger("location=%s", location.pathname);
    logger("state=%O", location.state);
  }, [location, logger]);

  return (
    <>
      <InfoItemComponent>
        <IonNote>
          Custom elements are currently under development and have limited
          functionality.
        </IonNote>
      </InfoItemComponent>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton
          color="primary"
          routerLink={routeLibraryCreateCustomElement({ workshopId })}
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      {isFetching || customElements === undefined ? (
        <IonSpinner></IonSpinner>
      ) : !customElements.length ? (
        <CustomElementsEmptyComponent></CustomElementsEmptyComponent>
      ) : (
        <CustomElementsListComponent
          workshopId={workshopId}
          customElements={customElements}
        ></CustomElementsListComponent>
      )}
    </>
  );
};
