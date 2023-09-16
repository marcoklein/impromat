import { IonButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { routeCreateWorkshop } from "../../../routes/shared-routes";

interface ContainerProps {}

export const WorkshopCreateFirstComponent: React.FC<ContainerProps> = ({}) => (
  <div
    className="ion-padding"
    style={{
      minHeight: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <p>Start by creating your very first workshop:</p>
    <IonButton expand="full" routerLink={routeCreateWorkshop()}>
      <IonIcon slot="start" icon={add}></IonIcon>
      Add Workshop
    </IonButton>
  </div>
);
