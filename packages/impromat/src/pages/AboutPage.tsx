import ReactMarkdown from "react-markdown";
import { PageScaffold } from "../components/PageScaffold";
import { aboutMarkdownEn } from "../markdown/about.en.md.gen";

export const AboutPage: React.FC = () => {
  return (
    <PageScaffold title="About">
      <div className="ion-padding">
        <ReactMarkdown>{aboutMarkdownEn}</ReactMarkdown>
      </div>
    </PageScaffold>
  );
};
