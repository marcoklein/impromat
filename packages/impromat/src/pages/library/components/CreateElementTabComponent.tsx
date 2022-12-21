import { IonFab, IonFabButton, IonIcon, IonSpinner } from "@ionic/react";
import { add } from "ionicons/icons";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router";
import { RxCollection } from "rxdb";
import { useRxData } from "rxdb-hooks";
import { ElementDocType } from "../../../database/collections/element/element-collection";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { routeLibraryCreateCustomElement } from "../library-routes";
import { CustomElementsEmptyComponent } from "./CustomElementsEmptyComponent";
import { CustomElementsListComponent } from "./CustomElementsListComponent";

interface ContainerProps {
  workshopId: string | undefined;
}

export const CreateElementTabComponent: React.FC<ContainerProps> = ({
  workshopId,
}) => {
  const location = useLocation();
  const logger = useComponentLogger("CreateElementTabComponent");

  const { result: customElements, isFetching } = useRxData<ElementDocType>(
    "elements",
    useCallback(
      (collection: RxCollection) =>
        collection.find({
          selector: { basedOn: undefined, sourceName: undefined },
        }),
      [],
    ),
  );

  useEffect(() => {
    logger("location=%s", location.pathname);
    logger("state=%O", location.state);
  }, [location, logger]);

  return (
    <>
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
