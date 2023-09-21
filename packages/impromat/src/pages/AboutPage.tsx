import ReactMarkdown from "react-markdown";
import { PageScaffold } from "../components/PageScaffold";
import { aboutMarkdownEn } from "../markdown/about.en.md.gen";
import { routeHome } from "../routes/shared-routes";

export const AboutPage: React.FC = () => {
  return (
    <PageScaffold title="About" defaultBackHref={routeHome()}>
      <div className="ion-padding">
        <ReactMarkdown>{aboutMarkdownEn}</ReactMarkdown>
      </div>
    </PageScaffold>
  );
};
