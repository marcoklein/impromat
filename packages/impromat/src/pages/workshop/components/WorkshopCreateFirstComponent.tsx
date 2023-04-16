import { IonButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

interface ContainerProps {
  onCreateWorkshopClick: () => void;
}

export const WorkshopCreateFirstComponent: React.FC<ContainerProps> = ({
  onCreateWorkshopClick,
}) => (
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
    <IonButton expand="full" onClick={() => onCreateWorkshopClick()}>
      <IonIcon slot="start" icon={add}></IonIcon>
      Add Workshop
    </IonButton>
  </div>
);
