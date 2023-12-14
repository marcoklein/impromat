import { IonBadge, IonText } from "@ionic/react";
import { useMemo } from "react";
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

  return (
    <PreviewCard
      routerLink={routerLink}
      infoListElement={
        <ElementInfoList
          elementFragment={element}
          elementSearchResultFragment={searchResult}
        ></ElementInfoList>
      }
      title={element.name}
      content={element.summary ?? element.markdownShort ?? undefined}
    >
      {tags.length > 0 && (
        <div
          onClick={() => history.push(routerLink)}
          style={{
            cursor: "pointer",
            whiteSpace: "nowrap",
            overflowX: "auto",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="ion-margin-horizontal">
            {tags.map(({ id, name, isMatch }) => (
              // TODO use IonChip and allow filtering by clicking on it
              <IonBadge
                key={id}
                color={isMatch ? "primary" : "light"}
                // outline={!isMatch}
                style={{ marginRight: "4px" }}
              >
                <IonText color={isMatch ? "light" : "medium"}>{name}</IonText>
              </IonBadge>
            ))}
          </div>
        </div>
      )}
    </PreviewCard>
  );
};
