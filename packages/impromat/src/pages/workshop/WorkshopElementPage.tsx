import { ExpandMore } from "@mui/icons-material";
import { Box, Container, Divider, IconButton } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { PageScaffold } from "../../components/PageScaffold";
import { graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { ElementDetails } from "../library/ElementDetails";
import { ElementLikeIconButton } from "../library/ElementLikeIconButton";
import { WorkshopElementNote } from "./components/WorkshopElementNote";

const WorkshopElementPage_Query = graphql(`
  query WorkshopElementPage_Query($id: ID!) {
    workshopElement(id: $id) {
      id
      note
      basedOn {
        id
        name
        markdown
        sourceUrl
        sourceName
        sourceBaseUrl
        licenseName
        licenseUrl
        owner {
          id
        }
        isOwnerMe
        ...ElementDetails_Element
        ...CustomElement_Element
        ...Element_Element
        ...ElementLikeIconButton_Element
      }
      section {
        id
        workshop {
          id
          canEdit
        }
      }
    }
  }
`);

/**
 * Previews an individual workshop element.
 */
export const WorkshopElementPage: React.FC = () => {
  const logger = useComponentLogger("WorkshopElementPage");
  const { id: workshopId, partId: workshopElementId } = useParams<{
    id: string;
    partId: string;
  }>();
  const [workshopElementQueryResult, reexecuteWorkshopElementQueryResult] =
    useQuery({
      query: WorkshopElementPage_Query,
      // TODO pass in workshop id
      variables: { id: workshopElementId },
    });
  const workshopElement = workshopElementQueryResult.data?.workshopElement;
  const basedOnElement = workshopElement?.basedOn;
  const [, updateWorkshopElementNoteMutation] = useMutation(
    graphql(`
      mutation UpdateWorkshopElementNote($input: UpdateWorkshopInput!) {
        updateWorkshop(input: $input) {
          id
          sections {
            id
            elements {
              id
              note
            }
          }
        }
      }
    `),
  );

  useStateChangeLogger(workshopElement, "workshopElement", logger);
  useStateChangeLogger(basedOnElement, "basedOnElement", logger);

  const saveNotesChanges = useCallback(
    (noteInput: string) => {
      if (!workshopElement) return;
      const note = noteInput.trim();
      if (note === workshopElement.note) return;
      return updateWorkshopElementNoteMutation({
        input: {
          id: workshopId,
          sections: {
            update: [
              {
                id: workshopElement.section.id,
                elements: { update: [{ id: workshopElement.id, note }] },
              },
            ],
          },
        },
      });
    },
    [updateWorkshopElementNoteMutation, workshopElement, workshopId],
  );

  const { t } = useTranslation("WorkshopElementPage");

  return (
    <PageScaffold
      title={`Workshop Element ${
        workshopElement && !workshopElement.section.workshop.canEdit
          ? "(View)"
          : ""
      }`}
      backButton
      buttons={
        <IsLoggedIn>
          {workshopElement && workshopElement.section.workshop.canEdit && (
            <ElementLikeIconButton elementFragment={workshopElement.basedOn} />
          )}
        </IsLoggedIn>
      }
    >
      <Box sx={{ overflowY: "auto", height: "100%" }}>
        {workshopElement && (
          <Container maxWidth="sm" sx={{ p: 0 }}>
            {(workshopElement.section.workshop.canEdit ||
              workshopElement.note?.length) && (
              <>
                <WorkshopElementNote
                  note={workshopElement.note ?? ""}
                  saveNotesChanges={saveNotesChanges}
                />
              </>
            )}

            <Box sx={{ p: 1 }}>
              <ElementDetails elementFragment={workshopElement.basedOn} />
            </Box>
          </Container>
        )}
      </Box>
    </PageScaffold>
  );
};
