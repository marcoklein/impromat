import { IonIcon, IonItem, IonItemDivider, IonLabel } from "@ionic/react";
import { logOut } from "ionicons/icons";
import { useReplicationState } from "../../../database/use-replication-state";
import { useLogout } from "../../../hooks/use-logout";

interface ContainerProps {}

export const AccountSignedInComponent: React.FC<ContainerProps> = () => {
  const { triggerLogout } = useLogout();
  const { state, stateColor: color } = useReplicationState();

  return (
    <>
      <IonItem>
        <IonLabel className="ion-text-wrap">
          You are signed in and your workshops and elements synchronize accross
          your devices.
        </IonLabel>
      </IonItem>
      <IonItemDivider></IonItemDivider>
      <IonItem>
        <IonLabel className="ion-text-wrap">Synchronization Status</IonLabel>
        <IonLabel slot="end" color={color}>
          {state}
        </IonLabel>
      </IonItem>
      <IonItemDivider></IonItemDivider>
      <IonItem onClick={triggerLogout} button={true}>
        <IonIcon icon={logOut} slot="start"></IonIcon>
        <IonLabel>Logout</IonLabel>
      </IonItem>
    </>
  );
};
