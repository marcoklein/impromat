import { IonList } from "@ionic/react";
import { useEffect } from "react";
import { RxDocument } from "rxdb";
import { WorkshopElementPreviewItemComponent } from "../../../components/WorkshopElementPreviewItemComponent";
import { ElementDocType } from "../../../database/collections/element/element-collection";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import { routeLibraryElement } from "../library-routes";

interface ContainerProps {
  workshopId: string | undefined;
  customElements: RxDocument<ElementDocType>[];
}

export const CustomElementsListComponent: React.FC<ContainerProps> = ({
  customElements,
  workshopId,
}) => {
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
            routerLink={routeLibraryElement(element.id, { workshopId })}
            workshopElement={element}
          ></WorkshopElementPreviewItemComponent>
        ))}
      </IonList>
    </>
  );
};
