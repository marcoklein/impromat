import { IonContent } from "@ionic/react";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { MenuContentComponent } from "./menu/MenuContentComponent";
import { SignInMenuContentComponent } from "./menu/SignInMenuContentComponent";
import { HIDE_MENU_SIZE } from "./responsive-navigation";

export const ResponsiveMenu: React.FC = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <IonContent className={`ion-hide-${HIDE_MENU_SIZE}-down`} scrollY={false}>
      {isLoggedIn ? (
        <MenuContentComponent></MenuContentComponent>
      ) : (
        <SignInMenuContentComponent></SignInMenuContentComponent>
      )}
    </IonContent>
  );
};
