import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { PageScaffold } from "../components/PageScaffold";
import { privacyPolicyMarkdownDe } from "../markdown/privacy-policy.de.md.gen";
import { privacyPolicyMarkdownEn } from "../markdown/privacy-policy.en.md.gen";

export const PrivacyPolicyPage: React.FC = () => {
  const { t, i18n } = useTranslation("PrivacyPolicyPage");

  const [language, setLanguage] = useState<"en" | "de">(
    i18n.language === "de" ? "de" : "en",
  );

  return (
    <PageScaffold title={t("Privacy Policy", { ns: "common" })} backButton>
      <Container maxWidth="md" sx={{ overflow: "auto" }}>
        {language === "en" && (
          <>
            <Button onClick={() => setLanguage("de")} variant="outlined">
              Switch to German Version
            </Button>
            <ReactMarkdown>{privacyPolicyMarkdownEn}</ReactMarkdown>
          </>
        )}
        {language === "de" && (
          <>
            <Button onClick={() => setLanguage("en")} variant="outlined">
              {t("switchToEnglishVersion")}
            </Button>
            <ReactMarkdown>{privacyPolicyMarkdownDe}</ReactMarkdown>
          </>
        )}
      </Container>
    </PageScaffold>
  );
};
