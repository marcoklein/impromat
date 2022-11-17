import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { WorkshopElementPreviewItemComponent } from "../components/WorkshopElementPreviewItemComponent";
import { Element } from "../store/schema.gen";

export const FavoriteElementsPage: React.FC = () => {
  const [favoriteElements, setFavoriteElements] = useState<Element[]>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Favorite Elements</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
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
      </IonContent>
    </IonPage>
  );
};
