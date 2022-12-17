import { IonList } from "@ionic/react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { WorkshopElementPreviewItemComponent } from "../../components/WorkshopElementPreviewItemComponent";
import { ElementDocType } from "../../database/collections/element/element-collection";
import {
  routeLibraryElement,
  routeWorkshopAddElementFromImprobib,
} from "../../routes/shared-routes";
import { useComponentLogger } from "../../use-component-logger";
import { useStateChangeLogger } from "../../use-state-change-logger";

interface ContainerProps {
  favoriteElements: ElementDocType[];
}

export const FavoriteElementsListComponent: React.FC<ContainerProps> = ({
  favoriteElements,
}) => {
  const { id: workshopId } = useParams<{
    id?: string;
  }>();
  const logger = useComponentLogger("FavoriteElementsListComponent");
  useStateChangeLogger(favoriteElements, "favoriteElements", logger);
  useEffect(() => {
    logger("favoriteElements.length=%s", favoriteElements.length);
  }, [logger, favoriteElements]);
  return (
    <>
      {/* Add Account required... */}
      <IonList>
        {favoriteElements.map((element) => (
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
