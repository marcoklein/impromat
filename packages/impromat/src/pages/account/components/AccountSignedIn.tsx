import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
} from "@ionic/react";
import { logOut } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useLogout } from "../../../hooks/use-logout";
import { AccountLanguageSection } from "./AccountLanguageSection";

const AccountSignedIn_User = graphql(`
  fragment AccountSignedIn_User on User {
    id
    name
    languageCodes
    ...AccountLanguageSection_User
  }
`);

interface ContainerProps {
  userFragment: FragmentType<typeof AccountSignedIn_User>;
}

export const AccountSignedIn: React.FC<ContainerProps> = ({ userFragment }) => {
  const { triggerLogout } = useLogout();
  const user = getFragmentData(AccountSignedIn_User, userFragment);
  const { t } = useTranslation("AccountSignedIn");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <IonItemDivider>
          <IonLabel>{t("Profile")}</IonLabel>
        </IonItemDivider>
        <IonItem lines="full">
          <IonInput
            label={t("Display Name")}
            labelPlacement="floating"
            readonly
            placeholder={t("Change via menu on top right")}
            value={user.name}
          ></IonInput>
        </IonItem>

        <AccountLanguageSection userFragment={user}></AccountLanguageSection>

        <IonButton
          className="ion-margin-top"
          onClick={() => triggerLogout()}
          expand="full"
          fill="clear"
        >
          <IonIcon icon={logOut} slot="start"></IonIcon>
          {t("Logout")}
        </IonButton>
      </div>
    </div>
  );
};
