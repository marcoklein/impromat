import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ElementPreviewCard } from "../../components/ElementPreviewCard";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { Person4, ReceiptLong } from "@mui/icons-material";
import { useMemo } from "react";
import { routeLibraryElement } from "../../routes/shared-routes";

const MuiLibraryElement_Element = graphql(`
  fragment MuiLibraryElement_Element on Element {
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
`);

interface ContainerProps {
  elementFragments?: FragmentType<typeof MuiLibraryElement_Element>[];
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
export const MuiLibraryElements: React.FC<ContainerProps> = ({
  elementFragments,
  isQueryStale,
  isQueryFetching,
  scrollToTop,
  pageNumber,
  setPageNumber,
}) => {
  const logger = useComponentLogger("MuiLibraryElements");
  const elements = getFragmentData(MuiLibraryElement_Element, elementFragments);

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
    <Box height="100%">
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
          // TODO switch to ElementItem (in MUI design)
          // <ElementItem
          //   elementFragment={searchResult}
          //   onClick={() => router.push(routeLibraryElement(searchResult.id))}
          // ></ElementItem>
          <ElementPreviewCard
            routerLink={routeLibraryElement(searchResult.id)}
            elementFragment={searchResult}
          ></ElementPreviewCard>
        )}
      ></VirtualCardGrid>
    </Box>
  );
};
