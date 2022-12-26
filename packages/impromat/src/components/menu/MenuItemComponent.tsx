import { IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { useMemo } from "react";
import { useLocation } from "react-router";

interface ContainerProps {
  routerLink: string;
  icon: string;
  label: string;
  exact?: boolean;
}

export const MenuItemComponent: React.FC<ContainerProps> = ({
  routerLink,
  icon,
  label,
  exact,
}) => {
  const location = useLocation();
  const isRoute = useMemo(() => {
    if (exact) {
      return location.pathname === routerLink;
    }
    return location.pathname.startsWith(routerLink);
  }, [location.pathname, routerLink, exact]);

  return (
    <IonItem routerLink={routerLink} color={isRoute ? "light" : ""}>
      <IonIcon slot="start" icon={icon}></IonIcon>
      <IonLabel>
        <IonText color={isRoute ? "light" : ""}></IonText>
        {label}
      </IonLabel>
    </IonItem>
  );
};
