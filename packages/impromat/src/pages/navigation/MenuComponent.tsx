import { IonMenu } from "@ionic/react";
import { useCallback, useRef } from "react";
import { useHistoryListener } from "../../hooks/use-history-listener";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { MenuContentComponent } from "./menu/MenuContentComponent";
import { SignInMenuContentComponent } from "./menu/SignInMenuContentComponent";
import { HIDE_MENU_SIZE } from "./responsive-navigation";

export const MenuComponent: React.FC = () => {
  const menuRef = useRef<any>();
  const { isLoggedIn } = useIsLoggedIn();

  useHistoryListener(
    useCallback(() => {
      menuRef.current.close();
    }, [menuRef]),
  );

  return (
    <IonMenu
      side="start"
      menuId="mainMenu"
      contentId="main"
      ref={menuRef}
      className={`ion-hide-${HIDE_MENU_SIZE}-down`}
    >
      {isLoggedIn ? (
        <MenuContentComponent></MenuContentComponent>
      ) : (
        <SignInMenuContentComponent></SignInMenuContentComponent>
      )}
    </IonMenu>
  );
};
