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
import { useEffect, useState } from "react";
import { useRxCollection } from "rxdb-hooks";
import { WorkshopElementPreviewItemComponent } from "../components/WorkshopElementPreviewItemComponent";
import { ElementDocType } from "../database/collections/element/element-collection";
import { MeCollection } from "../database/collections/me/me-collection";
import { useComponentLogger } from "../use-component-logger";

export const FavoriteElementsPage: React.FC = () => {
  const [favoriteElements] = useState<ElementDocType[]>();
  const meCollection = useRxCollection<MeCollection>("me");
  const logger = useComponentLogger("FavoriteElementsPage");

  useEffect(() => {
    if (meCollection) {
      setTimeout(() => {
        (async () => {
          const me = await meCollection.findOne("me").exec();
          const myUser = await me?.populate("user");

          logger("me %O", me?.toJSON());
          logger("myUser %O", myUser?.toJSON());
        })();
      }, 1000);
    }
  }, [meCollection, logger]);

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
      </IonContent>
    </IonPage>
  );
};
