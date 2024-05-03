import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { PageScaffold } from "../components/PageScaffold";
import { aboutMarkdownDe } from "../markdown/about.de.md.gen";
import { aboutMarkdownEn } from "../markdown/about.en.md.gen";
import { routeHome } from "../routes/shared-routes";

export const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation("AboutPage");
  return (
    <PageScaffold title={t("About")} backButton backUrl={routeHome()}>
      <Container maxWidth="md" sx={{ overflow: "auto" }}>
        <Typography>
          <ReactMarkdown>
            {i18n.language === "de" ? aboutMarkdownDe : aboutMarkdownEn}
          </ReactMarkdown>
        </Typography>
      </Container>
    </PageScaffold>
  );
};
