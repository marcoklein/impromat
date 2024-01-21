import { IonButton, IonIcon } from "@ionic/react";
import { Box, Fab } from "@mui/material";
import { filter } from "ionicons/icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { AddNewWorkshopIcon } from "../../components/icons/AddNewWorkshopIcon";
import { getFragmentData, graphql } from "../../graphql-client";
import { UserWorkshopsFilterInput } from "../../graphql-client/graphql";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { usePersistedState } from "../../hooks/use-persisted-state";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { CreateWorkshopDialog } from "../library/CreateWorkshopDialog";
import { LegacyWorkshopCreateFirstComponent } from "./components/LegacyWorkshopCreateFirstComponent";
import { WorkshopPreviewCard } from "./components/LegacyWorkshopPreviewCard";

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
    workshopsQueryResult.data?.user?.workshops,
  );

  const [gridIsOnTop, setGridIsOnTop] = useState<boolean>(false);
  useStateChangeLogger(gridIsOnTop, "gridIsOnTop", logger);

  const [isCreateWorkshopDialogOpen, setIsCreateWorkshopDialogOpen] =
    useState(false);

  const { t } = useTranslation("WorkshopsPage");

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Fab
        color="primary"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        onClick={() => {
          setIsCreateWorkshopDialogOpen(true);
        }}
        aria-label={t("NewWorkshop")}
      >
        <AddNewWorkshopIcon />
      </Fab>

      <PageContentLoaderComponent
        noRefresher={!gridIsOnTop}
        queryResult={workshopsQueryResult}
        reexecuteQuery={reexecuteWorkshopsQuery}
      >
        {availableWorkshops?.length ? (
          <VirtualCardGrid
            size="small"
            scrollStoreKey="workshops-page"
            isFetching={
              workshopsQueryResult.fetching || workshopsQueryResult.stale
            }
            onTopStateChange={(atTop) => setGridIsOnTop(atTop)}
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
              <p>{t("FilterNoWorkshops")}</p>
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
                {t("ClearFilters")}
              </IonButton>
            </div>
          </div>
        ) : (
          <LegacyWorkshopCreateFirstComponent
            onCreateWorkshopClick={() => setIsCreateWorkshopDialogOpen(true)}
          ></LegacyWorkshopCreateFirstComponent>
        )}
        <CreateWorkshopDialog
          open={isCreateWorkshopDialogOpen}
          handleClose={() => setIsCreateWorkshopDialogOpen(false)}
        />
      </PageContentLoaderComponent>
    </Box>
  );
};
