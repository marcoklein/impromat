import { IonItemDivider, IonLabel, IonText } from "@ionic/react";
import { logIn, person, sync } from "ionicons/icons";
import { useReplicationState } from "../../database/use-replication-state";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { routeAccount, routeProfile } from "../../routes/shared-routes";
import { MenuItemComponent } from "./MenuItemComponent";

interface ContainerProps {}

/**
 * Renders an item with a Sliding Option for editing.
 */
export const AccountCardComponent: React.FC<ContainerProps> = () => {
  const { state: replicationState, stateColor: replicationStateColor } =
    useReplicationState();
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn === true) {
    return (
      <>
        <IonItemDivider>
          <IonLabel>Account</IonLabel>
        </IonItemDivider>
        <MenuItemComponent
          icon={person}
          label="Profile"
          routerLink={routeProfile()}
        ></MenuItemComponent>
        <MenuItemComponent
          icon={sync}
          label="Synchronization"
          routerLink={routeAccount()}
        >
          <IonText slot="end" color={replicationStateColor}>
            {replicationState}
          </IonText>
        </MenuItemComponent>
      </>
    );
  }
  if (isLoggedIn === false) {
    return (
      <>
        <IonItemDivider>
          <IonLabel>Account</IonLabel>
        </IonItemDivider>
        <MenuItemComponent
          icon={logIn}
          iconColor="primary"
          label="Sign In"
          routerLink={routeAccount()}
        ></MenuItemComponent>
      </>
    );
  }
  return <></>;
};
