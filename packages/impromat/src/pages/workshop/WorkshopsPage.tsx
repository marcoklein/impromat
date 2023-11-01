import { IonButton, IonContent, IonFab, IonIcon, IonLabel } from "@ionic/react";
import { filter } from "ionicons/icons";
import { useMemo } from "react";
import { useQuery } from "urql";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { WorkshopsFilterBar } from "../../components/WorkshopsFilterBar";
import { FEATURE_WORKSHOPS_FILTER_BAR } from "../../feature-toggles";
import { getFragmentData, graphql } from "../../graphql-client";
import { UserWorkshopsFilterInput } from "../../graphql-client/graphql";
import { useCreateWorkshopInputDialog } from "../../hooks/use-add-workshop-input-dialog";
import { useComponentLogger } from "../../hooks/use-component-logger";
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

  const availableWorkshops = getFragmentData(
    WorkshopFields_WorkshopFragment,
    workshopsQueryResult.data?.user.workshops,
  );

  const presentWorkshopInputDialog = useCreateWorkshopInputDialog();

  return (
    <PageScaffold
      customContentWrapper
      secondaryToolbar={
        <>
          {FEATURE_WORKSHOPS_FILTER_BAR && (
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
          )}
        </>
      }
    >
      <PageContentLoaderComponent
        queryResult={workshopsQueryResult}
        reexecuteQuery={reexecuteWorkshopsQuery}
      >
        <IonContent scrollY={false} className="ion-no-padding ion-no-margin">
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonButton
              color="primary"
              onClick={() => presentWorkshopInputDialog()}
            >
              <IonLabel>New Workshop</IonLabel>
            </IonButton>
          </IonFab>
          {availableWorkshops?.length ? (
            <VirtualCardGrid
              scrollStoreKey="workshops-page"
              isFetching={
                workshopsQueryResult.fetching || workshopsQueryResult.stale
              }
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
              onCreateWorkshopClick={() => presentWorkshopInputDialog()}
            ></WorkshopCreateFirstComponent>
          )}
        </IonContent>
      </PageContentLoaderComponent>
    </PageScaffold>
  );
};
