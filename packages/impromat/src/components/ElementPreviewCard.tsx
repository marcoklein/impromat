import { IonBadge, IonCardContent, IonIcon, IonText } from "@ionic/react";
import { sparkles } from "ionicons/icons";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { routeLibraryElement } from "../routes/library-routes";
import { ElementInfoList } from "./ElementInfoList";
import { PreviewCard } from "./PreviewCard";

const ElementPreviewItem_ElementSearchResultFragment = graphql(`
  fragment ElementPreviewItem_ElementSearchResult on ElementSearchResult {
    matches {
      key
      value
    }
    ...ElementInfoList_ElementSearchResult
  }
`);

const ElementPreviewItem_ElementFragment = graphql(`
  fragment ElementPreviewItem_Element on Element {
    id
    createdAt
    updatedAt
    version
    deleted
    name
    summary
    tags {
      id
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
    isFavorite
    owner {
      id
    }
    isOwnerMe
    ...CustomElement_Element
    ...ElementFavoriteIcon_Element
    ...ElementInfoList_Element
  }
`);

interface ContainerProps {
  routerLink?: string;
  elementFragment: FragmentType<typeof ElementPreviewItem_ElementFragment>;
  /**
   * Set if context is a search result to mark search result matches.
   */
  elementSearchResultFragment?: FragmentType<
    typeof ElementPreviewItem_ElementSearchResultFragment
  >;
}

/**
 * Previews content of an element in a card. Use within a grid or list.
 */
export const ElementPreviewCard: React.FC<ContainerProps> = ({
  routerLink: routerLinkInput,
  elementFragment,
  elementSearchResultFragment,
}) => {
  const element = getFragmentData(
    ElementPreviewItem_ElementFragment,
    elementFragment,
  );
  const searchResult = getFragmentData(
    ElementPreviewItem_ElementSearchResultFragment,
    elementSearchResultFragment,
  );
  const routerLink = useMemo(
    () => routerLinkInput ?? routeLibraryElement(element.id),
    [element.id, routerLinkInput],
  );
  const tags = useMemo(
    () =>
      element.tags.map((tag) => ({
        ...tag,
        isMatch: searchResult?.matches.find(
          (match) => match.key === "tags.name" && match.value === tag.name,
        ),
      })),
    [element, searchResult],
  );

  const history = useHistory();
  const { t } = useTranslation("ElementPreviewCard");

  return (
    <PreviewCard
      onCardClick={() => {
        history.push(routerLink);
      }}
      infoListElement={
        <ElementInfoList
          elementFragment={element}
          elementSearchResultFragment={searchResult}
        ></ElementInfoList>
      }
      titleElement={
        <IonText
          style={{
            fontWeight: searchResult?.matches.find(
              (match) => match.key === "name",
            )
              ? "bold"
              : undefined,
          }}
        >
          {element.name}
        </IonText>
      }
      buttonsElement={<></>}
    >
      <IonCardContent
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "inherit",
        }}
      >
        <div>
          {tags.map(({ id, name, isMatch }) => (
            <IonBadge
              key={id}
              color={isMatch ? "medium" : "light"}
              style={{ marginRight: "4px" }}
            >
              <IonText color={isMatch ? "light" : "medium"}>{name}</IonText>
            </IonBadge>
          ))}
        </div>
        <IonText>
          {/* TODO poll summary field until it is available */}
          {element.summary === undefined
            ? t("Summary not available")
            : element.summary}
        </IonText>
        <IonText className="ion-margin-top">
          <IonIcon icon={sparkles}></IonIcon> {t("AI generated")}
        </IonText>
      </IonCardContent>
    </PreviewCard>
  );
};
