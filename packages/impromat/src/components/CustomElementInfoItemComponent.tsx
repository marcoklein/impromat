import { Brush, Edit, Public } from "@mui/icons-material";
import { Button, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { ElementVisibility } from "../graphql-client/graphql";
import { routeLibraryEditCustomElement } from "../routes/library-routes";
import { routeLibraryElement } from "../routes/shared-routes";

const CustomElement_Element = graphql(`
  fragment CustomElement_Element on Element {
    id
    name
    visibility
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof CustomElement_Element>;
  workshopId?: string;
  showElementLink?: boolean;
}

export const CustomElementInfoItemComponent: React.FC<ContainerProps> = ({
  elementFragment,
  workshopId,
  showElementLink,
}) => {
  const element = getFragmentData(CustomElement_Element, elementFragment);
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Brush />
        </ListItemIcon>
        <ListItemText>
          This is your custom element
          {showElementLink && (
            <>
              {" "}
              <Link component={NavLink} to={routeLibraryElement(element.id)}>
                {element.name}
              </Link>
            </>
          )}{" "}
          that you can{" "}
          <Button
            variant="outlined"
            size="small"
            component={NavLink}
            to={routeLibraryEditCustomElement(element.id)}
            startIcon={<Edit />}
          >
            edit here
          </Button>
        </ListItemText>
      </ListItem>

      {element.visibility === ElementVisibility.Public && (
        <ListItem>
          <ListItemIcon>
            <Public color="primary" />
          </ListItemIcon>
          <ListItemText>Community Element</ListItemText>
        </ListItem>
      )}
    </>
  );
};
