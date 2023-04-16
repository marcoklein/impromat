import { IonCol } from "@ionic/react";
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {}

export const CardGridRowComponent: React.FC<ContainerProps> = ({
  children,
}) => (
  <IonCol size="12" sizeSm="6" sizeMd="6" sizeLg="6" sizeXl="4">
    {children}
  </IonCol>
);
