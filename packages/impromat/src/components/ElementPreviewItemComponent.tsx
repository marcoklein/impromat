import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { brush, eye, star } from "ionicons/icons";
import { useMemo } from "react";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { ElementVisibility } from "../graphql-client/graphql";
import { IconInfoList, IconInfoListItem } from "./IconInfoList";
import { TagsComponent } from "./TagsComponent";

const ElementPreviewItem_ElementFragment = graphql(`
  fragment ElementPreviewItem_Element on Element {
    id
    createdAt
    updatedAt
    version
    deleted
    name
    markdown
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
  /**
   * If true, shows an extra icon to depict elements with a PUBLIC visibility.
   */
  showVisibility?: boolean;
  workshopElementFragment: FragmentType<
    typeof ElementPreviewItem_ElementFragment
  >;
}

export const ElementPreviewItemComponent: React.FC<ContainerProps> = ({
  showVisibility,
  routerLink,
  workshopElementFragment,
}) => {
  const element = getFragmentData(
    ElementPreviewItem_ElementFragment,
    workshopElementFragment,
  );

  const infoList = useMemo<IconInfoListItem[]>(() => {
    const resultList: IconInfoListItem[] = [];

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
    <IonCard className="ion-no-margin" routerLink={routerLink}>
      <div className="ion-margin-end ion-margin-top ion-float-right">
        <IconInfoList list={infoList}></IconInfoList>
      </div>
      <IonCardHeader>
        <IonCardTitle>{element.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div>
          <TagsComponent tags={element.tags.map((t) => t.name)}></TagsComponent>
        </div>
      </IonCardContent>
      <div style={{ display: "flex" }}>
        <IonButton style={{ flexGrow: 1 }} fill="clear" routerLink={routerLink}>
          Open
        </IonButton>
      </div>
    </IonCard>
  );
};
