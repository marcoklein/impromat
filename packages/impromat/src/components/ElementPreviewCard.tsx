import { Typography } from "@mui/material";
import { useMemo } from "react";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { routeLibraryElement } from "../routes/shared-routes";
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
      footer={
        <Typography
          variant="caption"
          sx={{
            p: 0,
            m: 0,
          }}
        >
          {tags.map((tag) => `#${tag.name}`).join(" ")}
        </Typography>
      }
    ></PreviewCard>
  );
};
