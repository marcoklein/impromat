import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  title: string;
  isModalOpen: boolean;
  customContentWrapper?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

/**
 * A reusable page scaffold component for Ionic React apps.
 */
export const ModalScaffold: React.FC<ContainerProps> = ({
  title,
  isModalOpen: isSharingModalOpen,
  setIsModalOpen: setIsSharingModalOpen,
  children,
  customContentWrapper,
}) => {
  return (
    <IonModal
      isOpen={isSharingModalOpen}
      onDidDismiss={() => setIsSharingModalOpen(false)}
      style={{ "--max-height": "50%", "--max-width": "95%" }}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsSharingModalOpen(false)}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {customContentWrapper ? children : <IonContent>{children}</IonContent>}
    </IonModal>
  );
};
