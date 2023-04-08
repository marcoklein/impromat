import { IonIcon, IonItem, IonItemDivider, IonLabel } from "@ionic/react";
import { logOut } from "ionicons/icons";
import { useLogout } from "../../../hooks/use-logout";

interface ContainerProps {}

export const AccountSignedInComponent: React.FC<ContainerProps> = () => {
  const { triggerLogout } = useLogout();

  return (
    <>
      <IonItem>
        <IonLabel className="ion-text-wrap">
          You are signed in and your workshops and elements synchronize accross
          your devices.
        </IonLabel>
      </IonItem>
      <IonItemDivider></IonItemDivider>
      <IonItem onClick={() => triggerLogout()} button={true}>
        <IonIcon icon={logOut} slot="start"></IonIcon>
        <IonLabel>Logout</IonLabel>
      </IonItem>
    </>
  );
};
