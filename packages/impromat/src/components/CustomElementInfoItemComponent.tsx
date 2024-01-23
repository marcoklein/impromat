import { IonIcon, IonItem, IonLabel, IonRouterLink } from "@ionic/react";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { brush, globe } from "ionicons/icons";
import { Link } from "react-router-dom";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { ElementVisibility } from "../graphql-client/graphql";
import { routeLibraryEditCustomElement } from "../routes/library-routes";
import { routeLibraryElement } from "../routes/shared-routes";
import { COLOR_SHARED } from "../theme/theme-colors";

const CustomElement_Element = graphql(`
  fragment CustomElement_Element on Element {
    id
    name
    visibility
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof CustomElement_Element>;
  workshopId?: string;
  showElementLink?: boolean;
}

export const CustomElementInfoItemComponent: React.FC<ContainerProps> = ({
  elementFragment,
  workshopId,
  showElementLink,
}) => {
  const element = getFragmentData(CustomElement_Element, elementFragment);
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
          <Button
            variant="outlined"
            size="small"
            component={Link}
            to={routeLibraryEditCustomElement(element.id)}
            startIcon={<Edit />}
          >
            edit here
          </Button>
        </IonLabel>
      </IonItem>

      {element.visibility === ElementVisibility.Public && (
        <IonItem lines="none">
          <IonIcon icon={globe} slot="start" color={COLOR_SHARED}></IonIcon>
          <IonLabel className="ion-text-wrap">Community Element</IonLabel>
        </IonItem>
      )}
    </>
  );
};
