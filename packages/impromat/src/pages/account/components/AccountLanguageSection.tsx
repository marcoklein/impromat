import {
  IonCheckbox,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useUpdateUserMutation } from "../../../hooks/use-update-user-mutation";

const AccountLanguageSection_User = graphql(`
  fragment AccountLanguageSection_User on User {
    id
    languageCodes
  }
`);

interface ContainerProps {
  userFragment: FragmentType<typeof AccountLanguageSection_User>;
}

/**
 * Renders a language section for the user's account settings.
 * Allows the user to select a display language and toggle additional language content.
 *
 * @param userFragment - The user fragment containing the user's language codes.
 * @returns A React component that displays the language section.
 */
export const AccountLanguageSection: React.FC<ContainerProps> = ({
  userFragment,
}) => {
  const user = getFragmentData(AccountLanguageSection_User, userFragment);
  const { t, i18n } = useTranslation("AccountLanguageSection");

  const [updateUserMutationResult, updateUserMutation] =
    useUpdateUserMutation();

  const availableLanguageCodes = useMemo(() => ["en", "de"], []);
  const displayLanguageCode = useMemo(() => {
    const languageCode = user.languageCodes[0];
    if (availableLanguageCodes.includes(languageCode)) {
      return languageCode;
    }
    return "en";
  }, [availableLanguageCodes, user.languageCodes]);

  const showAdditionalLanguage = useMemo(
    () => user.languageCodes.length > 1,
    [user.languageCodes.length],
  );

  const sendLanguageMutation = useCallback(
    (primaryLanguageCode: string, showAdditionalLanguage: boolean) => {
      const languageCodesMutation = [primaryLanguageCode];
      if (showAdditionalLanguage) {
        languageCodesMutation.push(
          ...availableLanguageCodes.filter(
            (languageCode) => languageCode !== primaryLanguageCode,
          ),
        );
      }
      updateUserMutation({
        input: {
          id: user.id,
          languageCodes: languageCodesMutation,
        },
      });
    },
    [availableLanguageCodes, updateUserMutation, user.id],
  );

  const onShowAdditionalLanguageClick = useCallback(() => {
    const newShowAdditionalLanguage = !showAdditionalLanguage;
    sendLanguageMutation(displayLanguageCode, newShowAdditionalLanguage);
  }, [displayLanguageCode, sendLanguageMutation, showAdditionalLanguage]);

  const onLanguageCodeChange = useCallback(
    (languageCode: string) => {
      i18n.changeLanguage(languageCode);
      localStorage.setItem("i18nextLng", languageCode);

      sendLanguageMutation(languageCode, showAdditionalLanguage);
    },
    [i18n, sendLanguageMutation, showAdditionalLanguage],
  );

  return (
    <>
      <IonItemDivider>
        <IonLabel>{t("Language")}</IonLabel>
      </IonItemDivider>
      <IonItem lines="none">
        {updateUserMutationResult.fetching && (
          <IonSpinner slot="end"></IonSpinner>
        )}
        <IonSelect
          disabled={updateUserMutationResult.fetching}
          className="ion-text-wrap"
          label={t("Display Language")}
          labelPlacement="floating"
          placeholder={t("Select Language")}
          onIonChange={(event) => {
            onLanguageCodeChange(event.detail.value as string);
          }}
          aria-required={true}
          okText={t("Save")}
          cancelText={t("Cancel")}
          value={displayLanguageCode}
        >
          <IonSelectOption value="en">{t("English")}</IonSelectOption>
          <IonSelectOption value="de">{t("German")}</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem>
        {updateUserMutationResult.fetching && (
          <IonSpinner slot="end"></IonSpinner>
        )}
        <IonCheckbox
          disabled={updateUserMutationResult.fetching}
          checked={showAdditionalLanguage}
          onClick={onShowAdditionalLanguageClick}
        >
          <IonLabel className="ion-text-wrap">
            {t("showAdditionalLanguageContent")}
            <div>
              <IonNote>{t("showAdditionalLanguageNote")}</IonNote>
            </div>
          </IonLabel>
        </IonCheckbox>
      </IonItem>
      {displayLanguageCode === "de" && (
        <InfoItemComponent
          color="warning"
          message="Die deutsche Übersetzung ist noch unvollständig."
        ></InfoItemComponent>
      )}
    </>
  );
};
