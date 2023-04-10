import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import { useMutation, useQuery } from "urql";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { WorkshopPreviewItemComponent } from "./components/WorkshopPreviewItemComponent";

const WorkshopFields_WorkshopFragment = graphql(`
  fragment WorkshopFields_Workshop on Workshop {
    id
    ...WorkshopPreviewItem_Workshop
  }
`);

const WorkshopsQuery = graphql(`
  query WorkshopsQuery {
    workshops {
      ...WorkshopFields_Workshop
    }
  }
`);

const CreateWorkshopMutation = graphql(`
  mutation CreateWorkshopMutation($input: CreateWorkshopInput!) {
    createWorkshop(input: $input) {
      id
    }
  }
`);

export const WorkshopsPage: React.FC = () => {
  const logger = useComponentLogger("WorkshopsPage");

  const context = useMemo(() => ({ additionalTypenames: ["Workshop"] }), []);
  const [workshopsQueryResult] = useQuery({
    query: WorkshopsQuery,
    context,
  });
  const [, createWorkshopMutation] = useMutation(CreateWorkshopMutation);

  const availableWorkshops = getFragmentData(
    WorkshopFields_WorkshopFragment,
    workshopsQueryResult.data?.workshops,
  );

  const history = useHistory();
  const [presentInputDialog] = useInputDialog();

  const createWorkshopClick = useCallback(() => {
    presentInputDialog({
      header: "Workshop Name",
      message: "Enter a name for your workshop. You can change it later.",
      emptyInputMessage: "Please enter a name for your workshop.",
      onAccept: async (text) => {
        const { error, data } = await createWorkshopMutation({
          input: { name: text },
        });
        const id = data?.createWorkshop.id;
        if (error || !id) {
          return;
        }
        logger("Adding new workshop with id %s", id);
        const navigateTo = `/workshop/${id}`;
        history.replace(navigateTo);
        logger("Navigating to %s", navigateTo);
      },
    });
  }, [presentInputDialog, createWorkshopMutation, logger, history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Workshops</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => createWorkshopClick()}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {workshopsQueryResult.fetching || !availableWorkshops ? (
          <IonSpinner></IonSpinner>
        ) : availableWorkshops.length ? (
          <IonGrid>
            <IonRow>
              {availableWorkshops.map((workshop) => (
                <IonCol
                  key={workshop.id}
                  size="12"
                  sizeSm="6"
                  sizeMd="6"
                  sizeLg="6"
                  sizeXl="4"
                >
                  <WorkshopPreviewItemComponent
                    workshopFragment={workshop}
                  ></WorkshopPreviewItemComponent>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        ) : (
          <div
            className="ion-padding"
            style={{
              minHeight: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p>Start by creating your very first workshop:</p>
            <IonButton expand="full" onClick={() => createWorkshopClick()}>
              <IonIcon slot="start" icon={add}></IonIcon>
              Add Workshop
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
