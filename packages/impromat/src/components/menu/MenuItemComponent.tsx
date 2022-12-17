import { IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { useLocation } from "react-router";

interface ContainerProps {
  routerLink: string;
  icon: string;
  label: string;
}

export const MenuItemComponent: React.FC<ContainerProps> = ({
  routerLink,
  icon,
  label,
}) => {
  const location = useLocation();

  return (
    <IonItem
      routerLink={routerLink}
      color={location.pathname.startsWith(routerLink) ? "light" : ""}
    >
      <IonIcon slot="start" icon={icon}></IonIcon>
      <IonLabel>
        <IonText
          color={location.pathname.startsWith(routerLink) ? "light" : ""}
        ></IonText>
        {label}
      </IonLabel>
    </IonItem>
  );
};
