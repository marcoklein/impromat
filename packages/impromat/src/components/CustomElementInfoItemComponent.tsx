import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";
import { brush, pencil } from "ionicons/icons";
import { ElementDocType } from "../database/collections/element/element-collection";
import {
  routeLibraryEditCustomElement,
  routeLibraryElement,
} from "../pages/library/library-routes";

interface ContainerProps {
  element: Pick<ElementDocType, "id" | "name">;
  workshopId?: string;
  showElementLink?: boolean;
}

export const CustomElementInfoItemComponent: React.FC<ContainerProps> = ({
  element,
  workshopId,
  showElementLink,
}) => (
  <IonItem lines="none">
    <IonIcon icon={brush} slot="start"></IonIcon>
    <IonLabel className="ion-text-wrap">
      This is your custom element
      {showElementLink && (
        <>
          {" "}
          <IonRouterLink routerLink={routeLibraryElement(element.id)}>
            {element.name}
          </IonRouterLink>
        </>
      )}{" "}
      that you can{" "}
      <IonButton
        fill="outline"
        size="small"
        className="ion-no-padding-vertical ion-no-margin"
        routerLink={routeLibraryEditCustomElement({
          elementId: element.id,
          workshopId,
        })}
      >
        <IonIcon icon={pencil} slot="start"></IonIcon>
        edit here
      </IonButton>
    </IonLabel>
  </IonItem>
);
