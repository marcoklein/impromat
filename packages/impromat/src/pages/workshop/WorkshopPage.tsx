import {
  Event,
  Link as LinkIcon,
  Lock,
  Public,
  ViewDay,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Fab,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { PageScaffold } from "../../components/PageScaffold";
import { ElementsIcon } from "../../components/icons/ElementsIcon";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { routeLibrary } from "../../routes/shared-routes";
import { ShareWorkshopModal } from "./components/ShareWorkshopModal";
import { TextFieldDialog } from "./components/TextFieldDialog";
import { WorkshopContent } from "./components/WorkshopContent";
import { WorkshopLikeIconButton } from "./components/WorkshopLikeButton";
import { WorkshopOptionsMenu } from "./components/WorkshopOptionsMenu";
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
    ...ShareWorkshopModal_Workshop
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

  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
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

  return (
    <PageScaffold
      title={`Workshop ${workshop && !workshop.canEdit ? "(View)" : ""}`}
      backButton
      buttons={
        <>
          {workshop && isLoggedIn && (
            <IsLoggedIn>
              <WorkshopLikeIconButton workshopFragment={workshop} />
            </IsLoggedIn>
          )}
          {workshop && workshop.canEdit && (
            <>
              <IconButton
                onClick={() => setIsSharingModalOpen(true)}
                aria-label={t("Share", { ns: "common" })}
                color="inherit"
              >
                {workshop.isPublic ? (
                  workshop.isListed ? (
                    <Public />
                  ) : (
                    <LinkIcon />
                  )
                ) : (
                  <Lock />
                )}
              </IconButton>
              <ShareWorkshopModal
                isSharingModalOpen={isSharingModalOpen}
                setIsSharingModalOpen={setIsSharingModalOpen}
                workshopFragment={workshop}
              ></ShareWorkshopModal>
              <WorkshopOptionsMenu
                goBackAfterDeletion
                workshopFragment={workshop}
              ></WorkshopOptionsMenu>
            </>
          )}
        </>
      }
    >
      <Box sx={{ overflowY: "auto", height: "100%" }}>
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            display: "flex",
            alignItems: "end",
          }}
        >
          {workshop && workshop.canEdit && (
            <>
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
            </>
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
