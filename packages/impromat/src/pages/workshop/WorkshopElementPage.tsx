import { Box, Container } from "@mui/material";
import { useCallback } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { PageScaffold } from "../../components/PageScaffold";
import { ShareButton } from "../../components/ShareButton";
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
  const [workshopElementQueryResult] = useQuery({
    query: WorkshopElementPage_Query,
    // TODO pass in workshop id
    variables: { id: workshopElementId },
  });
  const workshopElement = workshopElementQueryResult.data?.workshopElement;
  const basedOnElement = workshopElement?.basedOn;
  const canEdit = workshopElement?.section.workshop.canEdit ?? undefined;
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

  return (
    <PageScaffold
      prominent
      activateOnScroll
      title={basedOnElement?.name}
      backButton
      backUrl={`/workshop/${workshopId}`}
      buttons={
        <>
          <IsLoggedIn>
            {workshopElement && workshopElement.section.workshop.canEdit && (
              <ElementLikeIconButton
                elementFragment={workshopElement.basedOn}
              />
            )}
          </IsLoggedIn>
          <ShareButton />
        </>
      }
    >
      <Box sx={{ height: "100%" }}>
        {workshopElement && (
          <Container maxWidth="sm" sx={{ p: 0 }}>
            {(canEdit || workshopElement.note?.length) && (
              <>
                <WorkshopElementNote
                  note={workshopElement.note ?? ""}
                  saveNotesChanges={saveNotesChanges}
                  canEdit={canEdit}
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
