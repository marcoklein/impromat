import { IonButton, IonContent } from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { LegacyPageScaffold } from "../components/LegacyPageScaffold";
import { privacyPolicyMarkdownDe } from "../markdown/privacy-policy.de.md.gen";
import { privacyPolicyMarkdownEn } from "../markdown/privacy-policy.en.md.gen";
import { routeHome } from "../routes/shared-routes";

export const PrivacyPolicyPage: React.FC = () => {
  const { t, i18n } = useTranslation("PrivacyPolicyPage");

  const [language, setLanguage] = useState<"en" | "de">(
    i18n.language === "de" ? "de" : "en",
  );

  return (
    <LegacyPageScaffold
      title={t("Privacy Policy", { ns: "common" })}
      customContentWrapper
      defaultBackHref={routeHome()}
    >
      <IonContent className="ion-padding">
        {language === "en" && (
          <>
            <IonButton onClick={() => setLanguage("de")} fill="outline">
              Switch to German Version
            </IonButton>
            <ReactMarkdown>{privacyPolicyMarkdownEn}</ReactMarkdown>
          </>
        )}
        {language === "de" && (
          <>
            <IonButton onClick={() => setLanguage("en")} fill="outline">
              {t("switchToEnglishVersion")}
            </IonButton>
            <ReactMarkdown>{privacyPolicyMarkdownDe}</ReactMarkdown>
          </>
        )}
      </IonContent>
    </LegacyPageScaffold>
  );
};
