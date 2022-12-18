import { IonList } from "@ionic/react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { RxDocument } from "rxdb";
import { WorkshopElementPreviewItemComponent } from "../../components/WorkshopElementPreviewItemComponent";
import { ElementDocType } from "../../database/collections/element/element-collection";
import {
  routeLibraryElement,
  routeWorkshopAddElementFromImprobib,
} from "../../routes/shared-routes";
import { useComponentLogger } from "../../use-component-logger";
import { useStateChangeLogger } from "../../use-state-change-logger";

interface ContainerProps {
  customElements: RxDocument<ElementDocType>[];
}

export const CustomElementsListComponent: React.FC<ContainerProps> = ({
  customElements,
}) => {
  const { id: workshopId } = useParams<{
    id?: string;
  }>();
  const logger = useComponentLogger("CustomElementsListComponent");
  useStateChangeLogger(customElements, "customElements", logger);
  useEffect(() => {
    logger("customElements.length=%s", customElements.length);
  }, [logger, customElements]);
  return (
    <>
      {/* Add Account required... */}
      <IonList>
        {customElements.map((element) => (
          <WorkshopElementPreviewItemComponent
            key={element.id}
            routerLink={
              workshopId
                ? routeWorkshopAddElementFromImprobib(workshopId, element.id)
                : routeLibraryElement(element.id)
            }
            workshopElement={element}
          ></WorkshopElementPreviewItemComponent>
        ))}
      </IonList>
    </>
  );
};
