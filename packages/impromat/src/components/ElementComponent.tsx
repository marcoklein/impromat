import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { globe, sparkles } from "ionicons/icons";
import { Trans, useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { useIsLoggedIn } from "../hooks/use-is-logged-in";
import { TeaserGrid } from "../pages/community/TeaserGrid";
import { routeLibraryEditCustomElement } from "../routes/library-routes";
import { COLOR_SHARED } from "../theme/theme-colors";
import { CustomElementInfoItemComponent } from "./CustomElementInfoItemComponent";
import { ElementPreviewCard } from "./ElementPreviewCard";
import { InfoItemComponent } from "./InfoItemComponent";
import { LicenseItemComponent } from "./LicenseItemComponent";
import { TagsComponent } from "./TagsComponent";

const Element_ElementFragment = graphql(`
  fragment Element_Element on Element {
    id
    createdAt
    updatedAt
    version
    deleted
    name
    markdown
    summary
    tags {
      name
    }
    usedBy {
      id
    }
    languageCode
    sourceUrl
    sourceName
    sourceBaseUrl
    licenseName
    licenseUrl
    visibility
    recommendations {
      id
      ...ElementPreviewItem_Element
    }
    owner {
      id
      name
    }
    isOwnerMe
    ...CustomElement_Element
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof Element_ElementFragment>;
}

/**
 * Shared component for displaying an improv element.
 */
export const ElementComponent: React.FC<ContainerProps> = ({
  elementFragment,
}) => {
  const element = getFragmentData(Element_ElementFragment, elementFragment);
  const { t } = useTranslation("ElementComponent");
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <>
      <div className="ion-padding">
        <TagsComponent tags={element.tags.map((t) => t.name)}></TagsComponent>
        {element.summary && (
          <IonItem>
            <IonLabel className="ion-text-wrap">
              {element.summary}
              <IonNote>
                {" "}
                <IonIcon icon={sparkles}></IonIcon> {t("AI generated")}
              </IonNote>
            </IonLabel>
          </IonItem>
        )}
        <ReactMarkdown>{element.markdown ?? ""}</ReactMarkdown>
      </div>
      {element.isOwnerMe ? (
        <CustomElementInfoItemComponent
          elementFragment={element}
        ></CustomElementInfoItemComponent>
      ) : element.sourceName === "impromat" &&
        element.owner?.name !== "improbib" ? (
        <>
          <InfoItemComponent
            message={`Created by ${
              element.owner?.name ?? "a user"
            } in impromat`}
          ></InfoItemComponent>
        </>
      ) : (
        <LicenseItemComponent
          authorName={element.sourceName}
          authorUrl={element.sourceBaseUrl}
          licenseName={element.licenseName}
          licenseUrl={element.licenseUrl}
          name={element.name}
          sourceUrl={element.sourceUrl}
        ></LicenseItemComponent>
      )}
      {!element.isOwnerMe && element.visibility === "PUBLIC" && isLoggedIn && (
        <IonItem>
          <IonIcon slot="start" icon={globe} color={COLOR_SHARED}></IonIcon>
          <IonLabel className="ion-text-wrap">
            {t("CommunityElement")}
            <div>
              <IonNote>
                <Trans
                  t={t}
                  i18nKey="ImproveElement"
                  components={{
                    EditingLink: (
                      <NavLink
                        to={routeLibraryEditCustomElement({
                          elementId: element.id,
                        })}
                      >
                        placeholder
                      </NavLink>
                    ),
                  }}
                ></Trans>
              </IonNote>
            </div>
          </IonLabel>
        </IonItem>
      )}

      {element.recommendations.length > 0 && (
        <TeaserGrid
          title={t("SimilarElements")}
          items={element.recommendations}
          itemContent={(element) => (
            <ElementPreviewCard
              key={element.id}
              elementFragment={element}
            ></ElementPreviewCard>
          )}
        ></TeaserGrid>
      )}
    </>
  );
};
