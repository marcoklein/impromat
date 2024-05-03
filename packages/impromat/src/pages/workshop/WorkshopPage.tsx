import Event from "@mui/icons-material/Event";
import ViewDay from "@mui/icons-material/ViewDay";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { OptionsButton } from "../../components/OptionsButton";
import { PageScaffold } from "../../components/PageScaffold";
import { ShareButton } from "../../components/ShareButton";
import { ElementsIcon } from "../../components/icons/ElementsIcon";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { routeLibrary, routeWorkshops } from "../../routes/shared-routes";
import { TextFieldDialog } from "./components/TextFieldDialog";
import { WorkshopContent } from "./components/WorkshopContent";
import { WorkshopLikeIconButton } from "./components/WorkshopLikeButton";
import { WorkshopOptionsMenu } from "./components/WorkshopOptionsMenu";
import { WorkshopSharingButton } from "./components/WorkshopSharingButton";
import { STORAGE_LAST_WORKSHOP_ID } from "./components/local-storage-workshop-id";

const WorkshopPage_Workshop = graphql(`
  fragment WorkshopPage_Workshop on Workshop {
    id
    version
    isPublic
    isListed
    createdAt
    updatedAt
    deleted
    name
    description
    canEdit
    isLiked
    dateOfWorkshop
    ...WorkshopContent_Workshop
    elementRecommendations {
      id
      ...ElementPreviewItem_Element
    }
    ...WorkshopLikeIconButton_Workshop

    ...WorkshopOptionsMenu_Workshop
    ...WorkshopSharingButton_Workshop
  }
`);

const WorkshopByIdQuery = graphql(`
  query WorkshopByIdQuery($id: ID!) {
    workshop(id: $id) {
      ...WorkshopPage_Workshop
    }
  }
`);

export const WorkshopPage: React.FC = () => {
  const { id: workshopId } = useParams<{ id: string }>();
  const { t } = useTranslation("WorkshopPage");
  const { isLoggedIn } = useIsLoggedIn();
  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();
  const logger = useComponentLogger("WorkshopPage");

  const [isCreateSectionDialogOpen, setIsCreateSectionDialogOpen] =
    useState(false);

  useEffect(() => {
    logger("writing last workshop id to local storage");
    window.localStorage.setItem(STORAGE_LAST_WORKSHOP_ID, workshopId);
  }, [logger, workshopId]);

  const [workshopQueryResult] = useQuery({
    query: WorkshopByIdQuery,
    variables: {
      id: workshopId,
    },
  });
  const workshop = getFragmentData(
    WorkshopPage_Workshop,
    workshopQueryResult.data?.workshop,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const CanEdit: React.FC<PropsWithChildren> = useCallback(
    ({ children }) => {
      if (!workshop?.canEdit) {
        return null;
      }
      return <>{children}</>;
    },
    [workshop],
  );

  return (
    <PageScaffold
      backButton
      backUrl={routeWorkshops()}
      prominent
      buttons={
        <>
          {workshop && (
            <>
              <IsLoggedIn>
                <WorkshopLikeIconButton workshopFragment={workshop} />
              </IsLoggedIn>
              <ShareButton />
              <CanEdit>
                <WorkshopSharingButton workshopFragment={workshop} />
                <OptionsButton
                  ref={menuButtonRef}
                  onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                />
                <WorkshopOptionsMenu
                  goBackAfterDeletion
                  workshopFragment={workshop}
                  isMenuOpen={isMenuOpen}
                  onIsMenuOpenChange={setIsMenuOpen}
                  menuButtonRef={menuButtonRef}
                ></WorkshopOptionsMenu>
              </CanEdit>
            </>
          )}
        </>
      }
    >
      <Box sx={{ height: "100%" }}>
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            display: "flex",
            alignItems: "end",
          }}
        >
          {workshop && (
            <CanEdit>
              <Fab
                color="secondary"
                onClick={() => setIsCreateSectionDialogOpen(true)}
                sx={{ mr: 0.5 }}
                size="small"
                aria-label={t("Section", { ns: "common" })}
              >
                <ViewDay />
              </Fab>
              <TextFieldDialog
                title={t("Section", { ns: "common" })}
                handleClose={() => setIsCreateSectionDialogOpen(false)}
                open={isCreateSectionDialogOpen}
                handleSave={(text) =>
                  updateWorkshopMutation({
                    input: {
                      id: workshop.id,
                      sections: { create: [{ name: text }] },
                    },
                  })
                }
              ></TextFieldDialog>
              <Fab
                color="primary"
                component={Link}
                to={routeLibrary()}
                aria-label={t("Element", { ns: "common" })}
              >
                <ElementsIcon />
              </Fab>
            </CanEdit>
          )}
        </Box>
        {workshop && (
          <Container sx={{ p: 0 }} maxWidth="sm">
            <ListItem>
              <ListItemText
                primary={<Typography variant="h5">{workshop.name}</Typography>}
                secondary={workshop.description}
              ></ListItemText>
            </ListItem>
            {workshop.dateOfWorkshop && (
              // TODO set with date picker directly https://mui.com/x/react-date-pickers/date-picker/
              <ListItem>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {new Date(workshop.dateOfWorkshop).toLocaleDateString()}
                    </Typography>
                  }
                ></ListItemText>
              </ListItem>
            )}

            <Divider />
            <WorkshopContent workshopFragment={workshop} />
          </Container>
        )}
      </Box>
    </PageScaffold>
  );
};
