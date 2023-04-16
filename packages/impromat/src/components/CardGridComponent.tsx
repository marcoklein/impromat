import { IonGrid, IonRow } from "@ionic/react";
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {}

export const CardGridComponent: React.FC<ContainerProps> = ({ children }) => (
  <IonGrid>
    <IonRow className="ion-align-items-start">{children}</IonRow>
  </IonGrid>
);
