import { IonItem, IonItemDivider, IonLabel, IonSpinner } from "@ionic/react";
import { logIn, person, sync } from "ionicons/icons";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { routeAccount, routeProfile } from "../../routes/shared-routes";
import { ReplicationStateIconComponent } from "../ReplicationStateIconComponent";
import { MenuItemComponent } from "./MenuItemComponent";

interface ContainerProps {}

export const AccountMenuItemComponent: React.FC<ContainerProps> = () => {
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
          <ReplicationStateIconComponent></ReplicationStateIconComponent>
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
  return (
    <>
      <IonItemDivider>
        <IonLabel>Account</IonLabel>
      </IonItemDivider>
      <IonItem>
        <IonSpinner></IonSpinner>
      </IonItem>
    </>
  );
};
