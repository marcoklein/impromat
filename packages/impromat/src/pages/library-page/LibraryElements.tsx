import { Person4, ReceiptLong } from "@mui/icons-material";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { ElementPreviewCard } from "../../components/ElementPreviewCard";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { routeLibraryElement } from "../../routes/shared-routes";

const LibraryElements_ElementSearchResult = graphql(`
  fragment LibraryElements_ElementSearchResult on ElementSearchResult {
    element {
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
      ...ElementItem_Element
      ...ElementPreviewItem_Element
    }
    ...ElementPreviewItem_ElementSearchResult
  }
`);

interface ContainerProps {
  elementSearchResultFragments?: FragmentType<
    typeof LibraryElements_ElementSearchResult
  >[];
  isQueryStale: boolean;
  isQueryFetching: boolean;
  scrollToTop: number;
  pageNumber: number;
  setPageNumber: (setFn: (currentNumber: number) => number) => void;
}

/**
 * Renders a list of elements with virtual scroll.
 *
 * @param param0
 * @returns
 */
export const LibraryElements: React.FC<ContainerProps> = ({
  elementSearchResultFragments: elementFragments,
  isQueryStale,
  isQueryFetching,
  scrollToTop,
  pageNumber,
  setPageNumber,
}) => {
  const logger = useComponentLogger("MuiLibraryElements");
  const elements = getFragmentData(
    LibraryElements_ElementSearchResult,
    elementFragments,
  );

  const headerElement = useMemo(
    () => (
      <>
        {/* TODO this is disabled for now to test the design */}
        {elements && elements.length > 0 && false && (
          <Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Person4></Person4>
                  </ListItemIcon>
                  <ListItemText primary="Charakterentwicklung" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ReceiptLong></ReceiptLong>
                  </ListItemIcon>
                  <ListItemText primary="Langformen" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}
      </>
    ),
    [elements],
  );
  return (
    <Container maxWidth="sm" sx={{ height: "100%", p: 0 }}>
      <VirtualCardGrid
        headerElement={headerElement}
        scrollStoreKey="search-element-tab-component"
        isFetching={isQueryFetching || isQueryStale}
        scrollToTop={scrollToTop}
        endReached={() => {
          logger("end reached, queryResult.stale=%s", isQueryStale);
          if (!isQueryStale) {
            setPageNumber((currentPageNumber) => currentPageNumber + 1);
            logger("setting page number to %s", pageNumber + 1);
          }
        }}
        items={elements ?? []}
        itemContent={(_index, searchResult) => (
          <ElementPreviewCard
            routerLink={routeLibraryElement(searchResult.element.id)}
            elementFragment={searchResult.element}
            elementSearchResultFragment={searchResult}
          ></ElementPreviewCard>
        )}
      ></VirtualCardGrid>
    </Container>
  );
};
