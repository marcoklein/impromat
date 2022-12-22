import { IonList } from "@ionic/react";
import { useEffect } from "react";
import { ElementPreviewItemComponent } from "../../../components/ElementPreviewItemComponent";
import { ElementDocType } from "../../../database/collections/element/element-collection";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import { routeLibraryElement } from "../library-routes";

interface ContainerProps {
  favoriteElements: ElementDocType[];
  workshopId: string | undefined;
}

export const FavoriteElementsListComponent: React.FC<ContainerProps> = ({
  favoriteElements,
  workshopId,
}) => {
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
          <ElementPreviewItemComponent
            key={element.id}
            routerLink={routeLibraryElement(element.id, { workshopId })}
            workshopElement={element}
          ></ElementPreviewItemComponent>
        ))}
      </IonList>
    </>
  );
};
