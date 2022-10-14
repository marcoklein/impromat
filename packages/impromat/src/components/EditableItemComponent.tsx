import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonItemSliding,
  IonLabel,
  useIonAlert,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { useCallback, useRef } from "react";
import { useHistoryListener } from "../hooks/use-history-listener";

interface ContainerProps {
  displayName: string;
  text: string;
  /**
   * Set to true if the text has multiple lines.
   */
  isMultiline?: boolean;
  isReordering?: boolean;
  disableEditing?: boolean;
  renderText?: (text: string) => JSX.Element;
  lines?: "full" | "inset" | "none";
  color?: string;
  onChangeText?: (newText: string) => void;
}

/**
 * Renders an item with a Sliding Option for editing.
 */
export const EditableItemComponent: React.FC<ContainerProps> = ({
  text,
  color,
  displayName,
  isReordering,
  isMultiline,
  disableEditing,
  lines,
  onChangeText,
  renderText: inputRenderText,
}) => {
  const optionsRef = useRef<any>();
  const [presentAlert, dismissAlert] = useIonAlert();

  const defaultRenderText: (text: string) => JSX.Element = useCallback(
    (text) => <IonLabel className="ion-text-wrap">{text}</IonLabel>,
    [],
  );
  const renderText = inputRenderText ?? defaultRenderText;

  const createWorkshopClick = useCallback(() => {
    presentAlert({
      header: `Update ${displayName}`,
      buttons: [
        {
          text: "Save",
          handler: async (value: { text: string }) => {
            if (onChangeText) {
              onChangeText(value.text);
            } else {
              console.warn(
                "No onChangeText handler specified. If you edit an item you might want to specify one.",
              );
            }
          },
        },
      ],
      inputs: [
        {
          type: isMultiline ? "textarea" : "text",
          name: "text",
          placeholder: "",
          value: text,
          attributes: { autofocus: true, maxlength: 200, rows: 5 },
        },
      ],
      onDidDismiss: () => {},
    });
  }, [presentAlert, text, onChangeText, isMultiline, displayName]);

  useHistoryListener(
    useCallback(() => {
      dismissAlert();
    }, [dismissAlert]),
  );

  return (
    <IonItemSliding ref={optionsRef} disabled={isReordering}>
      <IonItem lines={lines} color={color}>
        {renderText(text)}
        {!disableEditing && (
          <IonButtons slot="end">
            <IonButton onClick={() => createWorkshopClick()}>
              <IonIcon size="small" icon={createOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        )}
      </IonItem>
      {/* TODO */}
      {/* <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={() => createWorkshopClick()}>
          Edit
          <IonIcon slot="start" icon={createOutline}></IonIcon>
        </IonItemOption>
      </IonItemOptions> */}
    </IonItemSliding>
  );
};
