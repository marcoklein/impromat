import { IonButton, IonIcon } from "@ionic/react";
import { add, filter } from "ionicons/icons";
import { useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import { useMutation, useQuery } from "urql";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { WorkshopsFilterBar } from "../../components/WorkshopsFilterBar";
import { getFragmentData, graphql } from "../../graphql-client";
import { UserWorkshopsFilterInput } from "../../graphql-client/graphql";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { usePersistedState } from "../../hooks/use-persisted-state";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { WorkshopCreateFirstComponent } from "./components/WorkshopCreateFirstComponent";
import { WorkshopPreviewCard } from "./components/WorkshopPreviewCard";

const WorkshopFields_WorkshopFragment = graphql(`
  fragment WorkshopFields_Workshop on Workshop {
    id
    ...WorkshopPreviewItem_Workshop
  }
`);

const WorkshopsQuery = graphql(`
  query WorkshopsQuery(
    $userId: ID!
    $userWorkshopsFilterInput: UserWorkshopsFilterInput
  ) {
    user(id: $userId) {
      id
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
  const { myUserId } = useIsLoggedIn();

  const defaultFilterInput: Required<UserWorkshopsFilterInput> = useMemo(
    () => ({
      liked: true,
      owned: true,
      isPublic: true,
      isCommunity: false,
    }),
    [],
  );
  const [userWorkshopsFilterInput, setUserWorkshopsFilterInput] =
    usePersistedState<UserWorkshopsFilterInput>(
      "user-workshops-filter-input",
      defaultFilterInput,
    );

  const workshopsFilterInputQueryVariables = useMemo(() => {
    if (Object.values(userWorkshopsFilterInput).every((value) => !value)) {
      return defaultFilterInput;
    }
    return userWorkshopsFilterInput;
  }, [defaultFilterInput, userWorkshopsFilterInput]);

  const [workshopsQueryResult, reexecuteWorkshopsQuery] = useQuery({
    query: WorkshopsQuery,
    context,
    pause: !myUserId,
    variables: {
      userId: myUserId!,
      userWorkshopsFilterInput: workshopsFilterInputQueryVariables,
    },
  });
  useStateChangeLogger(myUserId, "myUserId", logger);
  useStateChangeLogger(
    workshopsQueryResult.fetching,
    "workshopsQueryResult.fetching",
    logger,
  );
  const [, createWorkshopMutation] = useMutation(CreateWorkshopMutation);

  const availableWorkshops = getFragmentData(
    WorkshopFields_WorkshopFragment,
    workshopsQueryResult.data?.user.workshops,
  );

  const history = useHistory();
  const [presentInputDialog] = useInputDialog();

  const createWorkshopClick = useCallback(() => {
    presentInputDialog({
      header: "Workshop Name",
      message: "Enter a name for your workshop. You can change it later:",
      placeholder: "Workshop name...",
      buttonText: "Create",
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
    <PageScaffold
      title="Workshops"
      toolbarButtons={
        <IonButton onClick={() => createWorkshopClick()}>
          <IonIcon slot="icon-only" icon={add}></IonIcon>
        </IonButton>
      }
      bottomToolbar={
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
      }
    >
      <PageContentLoaderComponent
        queryResult={workshopsQueryResult}
        reexecuteQuery={reexecuteWorkshopsQuery}
      >
        {availableWorkshops?.length ? (
          <VirtualCardGrid
            scrollStoreKey="workshops-page"
            isFetching={false}
            items={availableWorkshops}
            itemContent={(_index, workshop) => (
              <WorkshopPreviewCard
                workshopFragment={workshop}
              ></WorkshopPreviewCard>
            )}
          ></VirtualCardGrid>
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
                  setUserWorkshopsFilterInput({
                    liked: true,
                    owned: true,
                    isPublic: true,
                  });
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
    </PageScaffold>
  );
};
