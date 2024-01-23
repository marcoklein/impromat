import ReactMarkdown from "react-markdown";
import { LegacyPageScaffold } from "../components/LegacyPageScaffold";
import { aboutMarkdownEn } from "../markdown/about.en.md.gen";
import { aboutMarkdownDe } from "../markdown/about.de.md.gen";
import { useTranslation } from "react-i18next";
import { routeHome } from "../routes/shared-routes";

export const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation("AboutPage");
  return (
    <LegacyPageScaffold title={t("About")} defaultBackHref={routeHome()}>
      <div className="ion-padding">
        <ReactMarkdown>
          {i18n.language === "de" ? aboutMarkdownDe : aboutMarkdownEn}
        </ReactMarkdown>
      </div>
    </LegacyPageScaffold>
  );
};
