import { IonFab, IonFabButton, IonIcon, IonSpinner } from "@ionic/react";
import { add } from "ionicons/icons";
import { useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { RxCollection } from "rxdb";
import { useRxData } from "rxdb-hooks";
import { ElementDocType } from "../../database/collections/element/element-collection";
import {
  routeLibraryCreateCustomElement,
  routeWorkshopAddElementCreateCustomElement,
} from "../../routes/shared-routes";
import { useComponentLogger } from "../../use-component-logger";
import { CustomElementsEmptyComponent } from "../custom-elements/CustomElementsEmptyComponent";
import { CustomElementsListComponent } from "../custom-elements/CustomElementsListComponent";

export const CreateElementTabComponent: React.FC = () => {
  const { id: workshopId } = useParams<{
    id?: string;
  }>();

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
          routerLink={
            workshopId
              ? routeWorkshopAddElementCreateCustomElement(workshopId)
              : routeLibraryCreateCustomElement()
          }
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
          customElements={customElements}
        ></CustomElementsListComponent>
      )}
    </>
  );
};
