import { IonAlert } from "@ionic/react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");

  return (
    <IonAlert
      header={header}
      isOpen={isOpen}
      buttons={[
        {
          text: t("Cancel"),
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
