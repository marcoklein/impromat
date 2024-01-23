import { Box, Container, Fab, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";
import { useQuery } from "urql";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { PageScaffold } from "../../components/PageScaffold";
import { AddToWorkshopIcon } from "../../components/icons/AddToWorkshopIcon";
import { graphql } from "../../graphql-client";
import { useAddNewElementToWorkshopSection } from "../../hooks/use-add-new-element-to-workshop";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { routeWorkshop } from "../../routes/shared-routes";
import { STORAGE_LAST_WORKSHOP_ID } from "../workshop/components/local-storage-workshop-id";
import { AddToWorkshopSelectDialog } from "./AddToWorkshopSelectDialog";
import { ElementDetails } from "./ElementDetails";
import { ElementLikeIconButton } from "./ElementLikeIconButton";

const LibraryElementPageQuery = graphql(`
  query MuiLibraryElementQuery($elementId: ID!) {
    element(id: $elementId) {
      id

      ...ElementDetails_Element
      ...ElementLikeIconButton_Element
    }
    me {
      id
      workshops {
        ...AddToWorkshopSelectDialog_Workshop
      }
    }
  }
`);

export const LibraryElementPage: React.FC = () => {
  const logger = useComponentLogger("LibraryElementPage");
  const { t } = useTranslation("LibraryElementPage");
  const { libraryPartId } = useParams<{
    libraryPartId: string;
  }>();

  const [elementPageQueryResult, reexecuteElementPageQuery] = useQuery({
    query: LibraryElementPageQuery,
    variables: {
      elementId: libraryPartId,
    },
  });

  const element = elementPageQueryResult.data?.element;
  const [isAddToWorkshopDialogOpen, setIsAddToWorkshopDialogOpen] =
    useState(false);

  const [, addToWorkshopMutation] = useAddNewElementToWorkshopSection();

  const history = useHistory();

  const handleAddToWorkshop = useCallback(
    async (workshop: { id: string; sections: Array<{ id: string }> }) => {
      if (!element) {
        logger("No Element");
        return;
      }
      const lastSectionId = workshop.sections.at(-1)?.id;
      if (!lastSectionId) throw new Error("no last section id");
      localStorage.setItem(STORAGE_LAST_WORKSHOP_ID, workshop.id);

      await addToWorkshopMutation({
        elementId: element.id,
        sectionId: lastSectionId,
        workshopId: workshop.id,
      });

      setIsAddToWorkshopDialogOpen(false);
      history.push(`${routeWorkshop(workshop.id)}`);
    },
    [addToWorkshopMutation, element, history, logger],
  );

  const theme = useTheme();

  return (
    <PageScaffold
      backButton
      title={t("Element")}
      buttons={
        <IsLoggedIn>
          {element && (
            <ElementLikeIconButton
              elementFragment={element}
            ></ElementLikeIconButton>
          )}
        </IsLoggedIn>
      }
    >
      <Box sx={{ overflow: "auto" }}>
        <IsLoggedIn>
          <Fab
            sx={{
              position: "absolute",
              bottom: theme.spacing(2),
              right: theme.spacing(2),
            }}
            color="primary"
            aria-label="add"
            onClick={() => setIsAddToWorkshopDialogOpen(true)}
          >
            <AddToWorkshopIcon />
          </Fab>
          <AddToWorkshopSelectDialog
            onWorkshopSelect={(workshop) => {
              handleAddToWorkshop(workshop);
            }}
            workshopsFragment={elementPageQueryResult.data?.me?.workshops ?? []}
            open={isAddToWorkshopDialogOpen}
            handleClose={() => setIsAddToWorkshopDialogOpen(false)}
          ></AddToWorkshopSelectDialog>
        </IsLoggedIn>
        <Box maxWidth="sm" sx={{ overflow: "auto" }}>
          {element && (
            <Container maxWidth="sm" sx={{ py: 1 }}>
              <ElementDetails elementFragment={element}></ElementDetails>
            </Container>
          )}
        </Box>
      </Box>
    </PageScaffold>
  );
};
