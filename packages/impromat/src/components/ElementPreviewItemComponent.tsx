import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import { brush, eye, search, star } from "ionicons/icons";
import { useMemo } from "react";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { ElementVisibility } from "../graphql-client/graphql";
import { ElementFavoriteIconComponent } from "../pages/library/components/ElementFavoriteIconComponent";
import { IconInfoList, IconInfoListItem } from "./IconInfoList";

const ElementPreviewItem_ElementSearchResultFragment = graphql(`
  fragment ElementPreviewItem_ElementSearchResult on ElementSearchResult {
    score
    matches {
      key
      indices
      refIndex
      value
    }
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
    markdownShort
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
  }
`);

interface ContainerProps {
  routerLink: string;
  elementFragment: FragmentType<typeof ElementPreviewItem_ElementFragment>;
  /**
   * Set if context is a search result to mark search result matches.
   */
  elementSearchResultFragment?: FragmentType<
    typeof ElementPreviewItem_ElementSearchResultFragment
  >;
}

export const ElementPreviewItemComponent: React.FC<ContainerProps> = ({
  routerLink,
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

  const infoList = useMemo<IconInfoListItem[]>(() => {
    const resultList: IconInfoListItem[] = [];
    if (searchResult && searchResult.score < 0.05) {
      resultList.push({
        ionicIcon: search,
        color: "primary",
        displayText: `high match`,
      });
    }
    if (element.isFavorite)
      resultList.push({
        ionicIcon: star,
        color: "yellow-5",
        displayText: "favorite",
      });
    if (element.isOwnerMe && element.visibility === ElementVisibility.Public)
      resultList.push({
        ionicIcon: eye,
        color: "tertiary",
        displayText: "public",
      });
    if (element.isOwnerMe)
      resultList.push({
        ionicIcon: brush,
        color: "primary",
        displayText: "my element",
      });
    if (element.sourceName && !element.isOwnerMe)
      resultList.push({
        tablerIcon: "license",
        displayText: element.sourceName,
      });
    if (element.languageCode)
      resultList.push({
        tablerIcon: "language",
        displayText: element.languageCode.toUpperCase(),
      });
    return resultList;
  }, [element]);

  return (
    <IonCard
      className="ion-no-margin"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div style={{ overflow: "hidden", flexGrow: 1 }}>
        <div className="ion-margin-end ion-margin-top ion-float-right">
          <IconInfoList list={infoList}></IconInfoList>
        </div>
        <IonCardHeader>
          <IonCardTitle>
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
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
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
          <IonText>{element.markdownShort}</IonText>
        </IonCardContent>
      </div>
      <div style={{ display: "flex" }}>
        <IonButton style={{ flexGrow: 1 }} fill="clear" routerLink={routerLink}>
          Open
        </IonButton>
        <ElementFavoriteIconComponent
          elementFragment={element}
        ></ElementFavoriteIconComponent>
      </div>
    </IonCard>
  );
};
