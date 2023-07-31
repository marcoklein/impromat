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

  const [presentInputDialog] = useInputDialog();
  const [presentToast] = useIonToast();

  const [, updateUserMutation] = useUpdateUserMutation();

  const onRenameUser = () => {
    presentInputDialog({
      maxlength: 20,
      minlength: 3,
      inputRegex: /^[a-zA-Z \-_0-9]*$/,
      inputRegexMessage: "Please only use letters, numbers, -, or _.",
      header: "Rename",
      initialText: user.name ?? "",
      emptyInputMessage: "Please type a user name.",
      onAccept: async (text) => {
        const result = await updateUserMutation({
          input: { id: user.id, name: text },
        });
        if (!result.data) {
          presentToast({
            color: "warning",
            message:
              "User name change failed. Please verify your internet connection and retry.",
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
    <>
      <OptionsMenu
        header="Options"
        options={[
          {
            text: "Change Username",
            icon: person,
            handler: () => {
              onRenameUser();
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {},
            icon: close,
          },
        ]}
      ></OptionsMenu>
    </>
  );
};
