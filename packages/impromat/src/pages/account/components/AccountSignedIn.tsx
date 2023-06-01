import { IonButton, IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { logOut } from "ionicons/icons";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useLogout } from "../../../hooks/use-logout";

const AccountSignedIn_User = graphql(`
  fragment AccountSignedIn_User on User {
    id
    name
  }
`);

interface ContainerProps {
  userFragment: FragmentType<typeof AccountSignedIn_User>;
}

export const AccountSignedIn: React.FC<ContainerProps> = ({ userFragment }) => {
  const { triggerLogout } = useLogout();
  const user = getFragmentData(AccountSignedIn_User, userFragment);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <p className="ion-padding-horizontal">
          You are signed in and your workshops and elements synchronize accross
          your devices.
        </p>
        <IonItem>
          <IonText slot="start" color="medium">
            Display Name
          </IonText>
          <IonLabel>{user.name}</IonLabel>
        </IonItem>
        <IonButton
          className="ion-margin-top"
          onClick={() => triggerLogout()}
          expand="full"
          fill="clear"
        >
          <IonIcon icon={logOut} slot="start"></IonIcon>Logout
        </IonButton>
      </div>
    </div>
  );
};
