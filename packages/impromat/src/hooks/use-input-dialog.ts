import { useIonAlert, useIonToast } from "@ionic/react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useHistoryListener } from "./use-history-listener";

interface DialogProps {
  header: string;
  message?: string;
  initialText?: string;
  buttonText?: string;
  onAccept: (text: string) => boolean | void | Promise<void> | Promise<boolean>;
  isMultiline?: boolean;
  maxlength?: number;
  placeholder?: string;
  emptyInputMessage?: string;
  inputRegex?: RegExp;
  inputRegexMessage?: string;
  minlength?: number;
  /**
   * Input type.
   *
   * @default text
   */
  inputType?: "text" | "date";
}

/**
 * TODO refactor into Ionic 7 Inline Alert (https://ionicframework.com/docs/api/alert#inputs)
 */
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
    message,
    emptyInputMessage,
    placeholder,
    inputRegex,
    minlength,
    inputRegexMessage,
    inputType,
  }: DialogProps) => {
    history.push({
      pathname: history.location.pathname,
      search: "dialog",
    });
    const buttonInputType =
      inputType === "text" ? (isMultiline ? "textarea" : "text") : "date";
    presentAlert({
      header: `${displayName}`,
      message,
      buttons: [
        {
          text: buttonText ?? "Save",
          handler: async (value: { text: string }) => {
            if (emptyInputMessage && value.text.trim().length <= 0) {
              presentToast({
                color: "primary",
                message: emptyInputMessage,
                duration: 2000,
              });
              return false;
            }
            if (minlength && value.text.trim().length < minlength) {
              presentToast({
                color: "primary",
                message: `Input at least ${minlength} characters.`,
                duration: 2000,
              });
              return false;
            }
            if (inputRegex && !inputRegex.test(value.text)) {
              presentToast({
                color: "primary",
                message:
                  inputRegexMessage ?? "Input contains invalid characters.",
                duration: 2000,
              });
              return false;
            }
            if (onAccept) {
              return await onAccept(value.text);
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
          type: buttonInputType,
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
