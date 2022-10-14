import { IonMenu } from "@ionic/react";
import { useCallback, useRef } from "react";
import { useHistoryListener } from "../hooks/use-history-listener";
import { MenuContentComponent } from "./MenuContentComponent";

export const MenuComponent: React.FC = () => {
  const menuRef = useRef<any>();

  useHistoryListener(
    useCallback(() => {
      menuRef.current.close();
    }, [menuRef]),
  );

  return (
    <IonMenu side="start" menuId="mainMenu" contentId="main" ref={menuRef}>
      <MenuContentComponent></MenuContentComponent>
    </IonMenu>
  );
};
