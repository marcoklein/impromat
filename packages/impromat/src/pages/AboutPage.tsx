import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { PageScaffold } from "../components/PageScaffold";
import { aboutMarkdownDe } from "../markdown/about.de.md.gen";
import { aboutMarkdownEn } from "../markdown/about.en.md.gen";

export const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation("AboutPage");
  return (
    <PageScaffold title={t("About")} backButton>
      <Container maxWidth="md" sx={{ overflow: "auto" }}>
        <ReactMarkdown>
          {i18n.language === "de" ? aboutMarkdownDe : aboutMarkdownEn}
        </ReactMarkdown>
      </Container>
    </PageScaffold>
  );
};
