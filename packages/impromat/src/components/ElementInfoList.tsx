import Attribution from "@mui/icons-material/Attribution";
import Brush from "@mui/icons-material/Brush";
import Favorite from "@mui/icons-material/Favorite";
import Public from "@mui/icons-material/Public";
import Translate from "@mui/icons-material/Translate";
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

const SHOW_SOURCE = false;
const SHOW_LANGUAGE = false;

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
      {SHOW_SOURCE && !!element.sourceName && !element.isOwnerMe && (
        <InfoListItem
          icon={<Attribution />}
          displayText={element.sourceName}
        ></InfoListItem>
      )}
      {SHOW_LANGUAGE && !!element.languageCode && (
        <InfoListItem
          icon={<Translate />}
          displayText={element.languageCode.toUpperCase()}
        ></InfoListItem>
      )}
    </>
  );
};
