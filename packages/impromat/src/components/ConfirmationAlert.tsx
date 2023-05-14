import { IonAlert } from "@ionic/react";

interface ContainerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  header: string;
  confirmText: string;
}

export const ConfirmationAlert: React.FC<ContainerProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  header,
  confirmText,
}) => {
  return (
    <IonAlert
      header={header}
      isOpen={isOpen}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: confirmText,
          role: "submit",
          handler: () => {
            onConfirm();
          },
        },
      ]}
      onDidDismiss={() => onOpenChange(false)}
    ></IonAlert>
  );
};
