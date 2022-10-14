import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { information } from "ionicons/icons";

interface ContainerProps {
  message?: string;
  icon?: string;
  color?: string;
  children?: JSX.Element;
}

export const InfoItemComponent: React.FC<ContainerProps> = ({
  message,
  icon,
  color,
  children,
}) => (
  <IonItem lines="none" color={color}>
    <IonIcon icon={icon ?? information} slot="start"></IonIcon>{" "}
    <IonLabel className="ion-text-wrap">{message ?? children}</IonLabel>
  </IonItem>
);
