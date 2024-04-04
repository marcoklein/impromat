import {
  Attribution,
  Brush,
  Favorite,
  Public,
  Translate,
} from "@mui/icons-material";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { ElementVisibility } from "../graphql-client/graphql";
import { InfoListItem } from "./InfoListItem";

const ElementInfoList_Element = graphql(`
  fragment ElementInfoList_Element on Element {
    id
    isFavorite
    isOwnerMe
    languageCode
    sourceName
    visibility
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof ElementInfoList_Element>;
}

/**
 * Previews content of an element in a card. Use within a grid or list.
 */
export const ElementInfoList: React.FC<ContainerProps> = ({
  elementFragment,
}) => {
  const element = getFragmentData(ElementInfoList_Element, elementFragment);

  return (
    <>
      {element.isFavorite && (
        <InfoListItem
          displayText="liked"
          icon={<Favorite color="like" />}
        ></InfoListItem>
      )}
      {element.isOwnerMe && element.visibility === ElementVisibility.Public && (
        <InfoListItem
          icon={<Public color="secondary" />}
          displayText="public"
        ></InfoListItem>
      )}

      {element.isOwnerMe && (
        <InfoListItem
          icon={<Brush color="primary" />}
          displayText="my element"
        ></InfoListItem>
      )}
      {!!element.sourceName && !element.isOwnerMe && (
        <InfoListItem
          icon={<Attribution />}
          displayText={element.sourceName}
        ></InfoListItem>
      )}
      {!!element.languageCode && (
        <InfoListItem
          icon={<Translate />}
          displayText={element.languageCode.toUpperCase()}
        ></InfoListItem>
      )}
    </>
  );
};
