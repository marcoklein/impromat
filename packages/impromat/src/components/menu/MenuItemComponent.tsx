import { IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { PropsWithChildren, useMemo } from "react";
import { useLocation } from "react-router";

interface ContainerProps {
  routerLink: string;
  icon?: string;
  label: string;
  exact?: boolean;
  iconColor?: string;
}

export const MenuItemComponent: React.FC<PropsWithChildren<ContainerProps>> = ({
  routerLink,
  icon,
  label,
  exact,
  iconColor,
  children,
}) => {
  const location = useLocation();
  const isRoute = useMemo(() => {
    if (exact) {
      return location.pathname === routerLink;
    }
    return location.pathname.startsWith(routerLink);
  }, [location.pathname, routerLink, exact]);
  const defaultIconColor = "primary";

  return (
    <IonItem
      routerLink={routerLink}
      color={isRoute ? "light" : undefined}
      lines={isRoute ? "full" : "inset"}
      style={{ "--border-color": isRoute && "var(--ion-color-primary)" }}
    >
      {icon && (
        <IonIcon
          slot="start"
          icon={icon}
          color={isRoute ? iconColor ?? defaultIconColor : undefined}
        ></IonIcon>
      )}
      <IonLabel>
        <IonText color={isRoute ? "light" : ""}></IonText>
        {label}
      </IonLabel>
      {children}
    </IonItem>
  );
};
