import { IonRefresher, IonRefresherContent } from "@ionic/react";

interface ContainerProps {
  onRefresh: () => void;
}

export const Refresher: React.FC<ContainerProps> = ({ onRefresh }) => {
  return (
    <IonRefresher
      slot="fixed"
      onIonRefresh={(event) => {
        onRefresh();
        setTimeout(() => {
          event.detail.complete();
        }, 500);
      }}
    >
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
  );
};
