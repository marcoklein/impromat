import { Container } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { PageScaffold } from "../components/PageScaffold";
import { legalMarkdownEn } from "../markdown/legal.en.md.gen";

export const LegalPage: React.FC = () => {
  return (
    // TODO translate title
    <PageScaffold title="Legal" backButton>
      <Container maxWidth="md">
        <ReactMarkdown>{legalMarkdownEn}</ReactMarkdown>
      </Container>
    </PageScaffold>
  );
};
