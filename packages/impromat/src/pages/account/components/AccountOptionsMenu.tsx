import { useIonToast } from "@ionic/react";
import { close, person } from "ionicons/icons";
import { OptionsMenu } from "../../../components/OptionsMenu";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useInputDialog } from "../../../hooks/use-input-dialog";
import { useUpdateUserMutation } from "../../../hooks/use-update-user-mutation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AccountOptionsMenu_User = graphql(`
  fragment AccountOptionsMenu_User on User {
    id
    name
  }
`);

interface ContainerProps {
  userFragment: FragmentType<typeof AccountOptionsMenu_User>;
}

export const AccountOptionsMenu: React.FC<ContainerProps> = ({
  userFragment,
}) => {
  const logger = useComponentLogger("AccountOptionsMenu");
  const user = getFragmentData(AccountOptionsMenu_User, userFragment);

  const [isOpen, setIsOpen] = useState(false);

  const [presentInputDialog] = useInputDialog();
  const [presentToast] = useIonToast();

  const [, updateUserMutation] = useUpdateUserMutation();

  const { t } = useTranslation("AccountOptionsMenu");

  const onRenameUser = () => {
    presentInputDialog({
      maxlength: 20,
      minlength: 3,
      inputRegex: /^[a-zA-Z \-_0-9]*$/,
      inputRegexMessage: t("LetterUseMessage"),
      header: t("Rename"),
      initialText: user.name ?? "",
      emptyInputMessage: t("InputMessage"),
      onAccept: async (text) => {
        const result = await updateUserMutation({
          input: { id: user.id, name: text },
        });
        if (!result.data) {
          presentToast({
            color: "warning",
            message: t("FailMessage"),
            duration: 2000,
          });
          return false;
        }
        return true;
      },
    });
    logger("Showing rename Workshop dialog");
  };

  return (
    <OptionsMenu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={t("Options")}
      options={[
        {
          text: t("ChangeUsername"),
          icon: person,
          handler: () => {
            onRenameUser();
          },
        },
        {
          text: t("Cancel", { ns: "common" }),
          role: "cancel",
          handler: () => {},
          icon: close,
        },
      ]}
    ></OptionsMenu>
  );
};
