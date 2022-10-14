import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { information } from "ionicons/icons";

interface ContainerProps {
  message: string;
  icon?: string;
  color?: string;
}

export const InfoItemComponent: React.FC<ContainerProps> = ({
  message,
  icon,
  color,
}) => (
  <IonItem lines="none" color={color}>
    <IonIcon icon={icon ?? information} slot="start"></IonIcon>
    <IonLabel className="ion-text-wrap">{message}</IonLabel>
  </IonItem>
);
