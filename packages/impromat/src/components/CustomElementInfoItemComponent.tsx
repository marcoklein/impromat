import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";
import { brush, eye, pencil } from "ionicons/icons";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { ElementVisibility } from "../graphql-client/graphql";
import {
  routeLibraryEditCustomElement,
  routeLibraryElement,
} from "../pages/library/library-routes";

const CustomElement_ElementFragment = graphql(`
  fragment CustomElement_Element on Element {
    id
    name
    visibility
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof CustomElement_ElementFragment>;
  workshopId?: string;
  showElementLink?: boolean;
}

export const CustomElementInfoItemComponent: React.FC<ContainerProps> = ({
  elementFragment,
  workshopId,
  showElementLink,
}) => {
  const element = getFragmentData(
    CustomElement_ElementFragment,
    elementFragment,
  );
  return (
    <>
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

      {element.visibility === ElementVisibility.Public && (
        <IonItem lines="none" color="tertiary">
          <IonIcon icon={eye} slot="start"></IonIcon>
          <IonLabel className="ion-text-wrap">
            {element.name} is publicly shared with the Impromat community.
          </IonLabel>
        </IonItem>
      )}
    </>
  );
};
