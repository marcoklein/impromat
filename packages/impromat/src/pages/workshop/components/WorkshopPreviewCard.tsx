import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/system/Box";
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import { OptionsButton } from "../../../components/OptionsButton";
import { ShareButton } from "../../../components/ShareButton";
import { WorkshopInfoList } from "../../../components/WorkshopInfoList";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { routeWorkshop } from "../../../routes/shared-routes";
import { WorkshopLikeIconButton } from "./WorkshopLikeButton";
import { WorkshopOptionsMenu } from "./WorkshopOptionsMenu";
import { IsLoggedIn } from "../../../components/IsLoggedIn";

const WorkshopPreviewItem_WorkshopFragment = graphql(`
  fragment WorkshopPreviewItem_Workshop on Workshop {
    id
    version
    createdAt
    updatedAt
    deleted
    name
    description
    canEdit
    sections {
      id
      name
      elements {
        id
        basedOn {
          id
          name
        }
      }
    }
    ...WorkshopInfoList_Workshop
    ...WorkshopOptionsMenu_Workshop
    ...WorkshopLikeIconButton_Workshop
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopPreviewItem_WorkshopFragment>;
}

export const WorkshopPreviewCard: React.FC<ContainerProps> = ({
  workshopFragment,
}) => {
  const workshop = getFragmentData(
    WorkshopPreviewItem_WorkshopFragment,
    workshopFragment,
  );

  const elementNames = useMemo(
    () =>
      workshop.sections.flatMap((section) =>
        section.elements.map((element) => element.basedOn.name),
      ),
    [workshop],
  );

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const CanEdit: React.FC<PropsWithChildren> = useCallback(
    ({ children }) => (workshop.canEdit ? children : null),
    [workshop.canEdit],
  );

  return (
    <Card sx={{ m: 1, position: "relative" }}>
      <CardActionArea component={NavLink} to={routeWorkshop(workshop.id)}>
        <CardContent>
          <CardHeader
            sx={{ pt: 0 }}
            title={workshop.name}
            subheader={workshop.description ?? undefined}
          />
          <List disablePadding dense>
            {elementNames.map((elementName) => (
              <ListItem key={elementName} sx={{ py: 0 }}>
                <ListItemText primary={elementName} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ px: 2, pb: 1, pt: 2 }}>
            <WorkshopInfoList workshopFragment={workshop} />
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box sx={{ marginLeft: "auto" }}>
          <IsLoggedIn>
            <WorkshopLikeIconButton workshopFragment={workshop} />
          </IsLoggedIn>
          <ShareButton urlToShare={routeWorkshop(workshop.id)} />
          <CanEdit>
            <WorkshopOptionsMenu
              workshopFragment={workshop}
              isMenuOpen={isMenuOpen}
              onIsMenuOpenChange={setIsMenuOpen}
              menuButtonRef={menuButtonRef}
            />

            <OptionsButton
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            />
          </CanEdit>
        </Box>
      </CardActions>
    </Card>
  );
};
