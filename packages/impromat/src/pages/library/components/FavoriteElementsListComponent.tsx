import { useEffect } from "react";
import { ElementPreviewCard } from "../../../components/ElementPreviewCard";
import { PreviewCardGrid } from "../../../components/PreviewCardGrid";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import { routeLibraryElement } from "../library-routes";

const FavoriteElements_UserFragment = graphql(`
  fragment FavoriteElements_User on User {
    favoriteElements {
      element {
        id
        ...ElementPreviewItem_Element
      }
    }
  }
`);

interface ContainerProps {
  workshopId: string | undefined;
  favoriteElementsFragment: FragmentType<typeof FavoriteElements_UserFragment>;
}

export const FavoriteElementsListComponent: React.FC<ContainerProps> = ({
  favoriteElementsFragment,
  workshopId,
}) => {
  const user = getFragmentData(
    FavoriteElements_UserFragment,
    favoriteElementsFragment,
  );
  const favoriteElements = user.favoriteElements;
  const logger = useComponentLogger("FavoriteElementsListComponent");
  useStateChangeLogger(favoriteElements, "favoriteElements", logger);
  useEffect(() => {
    logger("favoriteElements.length=%s", favoriteElements.length);
  }, [logger, favoriteElements]);
  return (
    <PreviewCardGrid
      items={favoriteElements}
      itemContent={(_index, { element }) => (
        <ElementPreviewCard
          key={element.id}
          routerLink={routeLibraryElement(element.id, { workshopId })}
          elementFragment={element}
        ></ElementPreviewCard>
      )}
    ></PreviewCardGrid>
  );
};
