import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { ElementDocType } from "../database/collections/element/element-collection";
import { useImprobibElements } from "../database/improbib/use-improbib-elements";
import { useDocuments } from "../database/use-documents";
import { useMyUser } from "../database/use-my-user";
import { useComponentLogger } from "../use-component-logger";
import { useStateChangeLogger } from "../use-state-change-logger";
import { FavoriteElementsEmptyComponent } from "./favorite-elements/FavoriteElementsEmptyComponent";
import { FavoriteElementsListComponent } from "./favorite-elements/FavoriteElementsListComponent";

export const FavoriteElementsPage: React.FC = () => {
  const logger = useComponentLogger("FavoriteElementsPage");
  const { document: myUser } = useMyUser();
  useStateChangeLogger(myUser, "myUser", logger);
  // const { documents: favoriteElements } = useDocuments(
  //   "elements",
  //   myUser?.favoriteElements,
  //   logger,
  // );
  const improbibElements = useImprobibElements();
  // const [favoriteElements, setFavoriteElements] = useState<ElementDocType[]>();

  // useStateChangeLogger(favoriteElements, "favoriteElements", logger);

  const favoriteElements = useMemo(() => {
    if (myUser && improbibElements) {
      const mappedFavoriteElements: ElementDocType[] = [];
      myUser.favoriteElements.forEach((elementId) => {
        const mappedElement = improbibElements.find(
          (element) => element.id === elementId,
        );
        if (mappedElement) {
          mappedFavoriteElements.push(mappedElement);
        }
      });
      return mappedFavoriteElements;
    }
    return undefined;
  }, [improbibElements, myUser?.favoriteElements]);

  useEffect(() => {
    logger("myUser favElements=%O", myUser?.favoriteElements);
  }, [myUser, logger]);

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
        {favoriteElements === undefined ? (
          <IonSpinner></IonSpinner>
        ) : !favoriteElements.length ? (
          <FavoriteElementsEmptyComponent></FavoriteElementsEmptyComponent>
        ) : (
          <FavoriteElementsListComponent
            favoriteElements={favoriteElements}
          ></FavoriteElementsListComponent>
        )}
      </IonContent>
    </IonPage>
  );
};
