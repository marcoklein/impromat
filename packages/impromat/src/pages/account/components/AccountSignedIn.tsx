import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/react";
import { logOut } from "ionicons/icons";
import { useState } from "react";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useLogout } from "../../../hooks/use-logout";
import { useUpdateUserMutation } from "../../../hooks/use-update-user-mutation";

const AccountSignedIn_User = graphql(`
  fragment AccountSignedIn_User on User {
    id
    name
    languageCodes
  }
`);

interface ContainerProps {
  userFragment: FragmentType<typeof AccountSignedIn_User>;
}

export const AccountSignedIn: React.FC<ContainerProps> = ({ userFragment }) => {
  const { triggerLogout } = useLogout();
  const user = getFragmentData(AccountSignedIn_User, userFragment);

  const [showAtLeastOneInfo, setShowAtLeastOneInfo] = useState(false);
  const [updateUserMutationResult, updateUserMutation] =
    useUpdateUserMutation();

  const onLanguageCodesChange = (languageCodes: string[]) => {
    if (!languageCodes.length) {
      setShowAtLeastOneInfo(true);
    } else {
      setShowAtLeastOneInfo(false);
      updateUserMutation({
        input: { id: user.id, languageCodes },
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <p className="ion-padding-horizontal">
          You are signed in and your workshops and elements synchronize across
          your devices.
        </p>
        <IonItem lines="full">
          <IonInput
            label="Display Name"
            labelPlacement="floating"
            readonly
            placeholder="Change via menu on top right"
            value={user.name}
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          {updateUserMutationResult.fetching && (
            <IonSpinner slot="end"></IonSpinner>
          )}
          <IonSelect
            multiple
            disabled={updateUserMutationResult.fetching}
            className="ion-text-wrap"
            label="Content Language"
            labelPlacement="floating"
            aria-label="Food"
            placeholder="Select languages"
            onIonChange={(event) => {
              onLanguageCodesChange(event.detail.value as string[]);
            }}
            aria-required={true}
            okText="Save"
            value={user.languageCodes}
          >
            <IonSelectOption value="en">English</IonSelectOption>
            <IonSelectOption value="de">Deutsch</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem lines="full">
          <IonLabel className="ion-text-wrap ion-no-margin ion-margin-bottom">
            {showAtLeastOneInfo && (
              <div>
                <IonNote color="danger">
                  You have to select at least one language.
                </IonNote>
              </div>
            )}
            <div>
              <IonNote>
                Only workshops and elements with your selected languages will be
                shown.
              </IonNote>
            </div>
          </IonLabel>
        </IonItem>

        <IonButton
          className="ion-margin-top"
          onClick={() => triggerLogout()}
          expand="full"
          fill="clear"
        >
          <IonIcon icon={logOut} slot="start"></IonIcon>Logout
        </IonButton>
      </div>
    </div>
  );
};
