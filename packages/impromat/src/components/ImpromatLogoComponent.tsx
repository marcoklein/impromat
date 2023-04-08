import { IonImg } from "@ionic/react";

interface ContainerProps {}

export const ImpromatLogoComponent: React.FC<ContainerProps> = () => (
  <IonImg src="/assets/logo.svg" alt="Impromat Logo" />
);
