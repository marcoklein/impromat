import { IonList } from "@ionic/react";
import { WorkshopElementPreviewItemComponent } from "../../components/WorkshopElementPreviewItemComponent";
import { ElementDocType } from "../../database/collections/element/element-collection";

interface ContainerProps {
  favoriteElements: ElementDocType[];
}

export const FavoriteElementsListComponent: React.FC<ContainerProps> = ({
  favoriteElements,
}) => {
  return (
    <>
      {/* Add Account required... */}
      <IonList>
        {favoriteElements?.map((element) => (
          <WorkshopElementPreviewItemComponent
            key={element.id}
            // routerLink={routeWorkshopAddElementFromImprobib(
            //   workshopId,
            //   element.id,
            // )}
            workshopElement={element}
            routerLink={""}
          ></WorkshopElementPreviewItemComponent>
        ))}
      </IonList>
    </>
  );
};
