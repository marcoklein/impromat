import { useIonAlert, useIonToast } from "@ionic/react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useHistoryListener } from "./use-history-listener";

interface DialogProps {
  header: string;
  initialText?: string;
  buttonText?: string;
  onAccept: (text: string) => boolean | void | Promise<void>;
  isMultiline?: boolean;
  maxlength?: number;
  placeholder?: string;
  emptyInputMessage?: string;
}

export function useInputDialog() {
  const [presentAlert, dismissAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const history = useHistory();

  useHistoryListener(
    useCallback(() => {
      dismissAlert();
    }, [dismissAlert]),
  );

  const present = ({
    header: displayName,
    initialText: text,
    onAccept,
    isMultiline,
    buttonText,
    maxlength,
    emptyInputMessage,
    placeholder,
  }: DialogProps) => {
    history.push({
      pathname: history.location.pathname,
      search: "dialog",
    });
    presentAlert({
      header: `${displayName}`,
      buttons: [
        {
          text: buttonText ?? "Save",
          handler: (value: { text: string }) => {
            if (emptyInputMessage && value.text.trim().length <= 0) {
              presentToast({
                color: "primary",
                message: emptyInputMessage,
                duration: 2000,
              });
              return false;
            }
            if (onAccept) {
              return onAccept(value.text);
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
          placeholder: placeholder ?? "",
          value: text,
          attributes: {
            autofocus: true,
            maxlength: maxlength ?? 5000,
            rows: 5,
          },
        },
      ],
    });

    return dismissAlert;
  };

  return [present, dismissAlert];
}
