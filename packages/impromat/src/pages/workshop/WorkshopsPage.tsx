import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, filter } from "ionicons/icons";
import { useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import { useMutation, useQuery } from "urql";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { PreviewCardGrid } from "../../components/PreviewCardGrid";
import { WorkshopsFilterBar } from "../../components/WorkshopsFilterBar";
import { getFragmentData, graphql } from "../../graphql-client";
import { UserWorkshopsFilterInput } from "../../graphql-client/graphql";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { usePersistedState } from "../../hooks/use-persisted-state";
import { WorkshopCreateFirstComponent } from "./components/WorkshopCreateFirstComponent";
import { WorkshopPreviewCard } from "./components/WorkshopPreviewCard";

const WorkshopFields_WorkshopFragment = graphql(`
  fragment WorkshopFields_Workshop on Workshop {
    id
    ...WorkshopPreviewItem_Workshop
  }
`);

const WorkshopsQuery = graphql(`
  query WorkshopsQuery($userWorkshopsFilterInput: UserWorkshopsFilterInput) {
    me {
      workshops(input: $userWorkshopsFilterInput) {
        ...WorkshopFields_Workshop
      }
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

  const [userWorkshopsFilterInput, setUserWorkshopsFilterInput] =
    usePersistedState<UserWorkshopsFilterInput>({
      key: "user-workshops-filter-input",
      defaultValue: {
        liked: true,
        owned: true,
      },
    });

  const [workshopsQueryResult, reexecuteWorkshopsQuery] = useQuery({
    query: WorkshopsQuery,
    context,
    variables: {
      userWorkshopsFilterInput,
    },
  });
  const [, createWorkshopMutation] = useMutation(CreateWorkshopMutation);

  const availableWorkshops = getFragmentData(
    WorkshopFields_WorkshopFragment,
    workshopsQueryResult.data?.me.workshops,
  );

  const history = useHistory();
  const [presentInputDialog] = useInputDialog();

  const createWorkshopClick = useCallback(() => {
    presentInputDialog({
      header: "Workshop Name",
      message: "Enter a name for your workshop. You can change it later:",
      placeholder: "Workshop name...",
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
        <WorkshopsFilterBar
          filterInput={userWorkshopsFilterInput}
          onFilterInputChange={(filterInput) => {
            console.log("filter changed");
            reexecuteWorkshopsQuery();
            setUserWorkshopsFilterInput(filterInput);
            localStorage.setItem(
              "user-workshops-filter-input",
              JSON.stringify(filterInput),
            );
          }}
        ></WorkshopsFilterBar>
      </IonHeader>

      <IonContent>
        <PageContentLoaderComponent
          queryResult={workshopsQueryResult}
          reexecuteQuery={reexecuteWorkshopsQuery}
        >
          {availableWorkshops?.length ? (
            <PreviewCardGrid
              scrollStoreKey="workshops-page"
              isFetching={false}
              items={availableWorkshops}
              itemContent={(_index, workshop) => (
                <WorkshopPreviewCard
                  workshopFragment={workshop}
                ></WorkshopPreviewCard>
              )}
            ></PreviewCardGrid>
          ) : !userWorkshopsFilterInput.liked ||
            !userWorkshopsFilterInput.owned ? (
            <div
              className="ion-padding"
              style={{
                minHeight: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <p>The current filter selection returns no workshops</p>
                <IonButton
                  expand="full"
                  onClick={() => {
                    setUserWorkshopsFilterInput({ liked: true, owned: true });
                  }}
                >
                  <IonIcon slot="start" icon={filter}></IonIcon>
                  Clear Filters
                </IonButton>
              </div>
            </div>
          ) : (
            <WorkshopCreateFirstComponent
              onCreateWorkshopClick={() => createWorkshopClick()}
            ></WorkshopCreateFirstComponent>
          )}
        </PageContentLoaderComponent>
      </IonContent>
    </IonPage>
  );
};
