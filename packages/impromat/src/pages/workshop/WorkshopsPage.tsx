import { Filter } from "@mui/icons-material";
import { Box, Button, Fab, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
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
import { routeLogin } from "../../routes/shared-routes";
import { CreateWorkshopDialog } from "../library/CreateWorkshopDialog";
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

  const { myUserId, isLoggedIn } = useIsLoggedIn();

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

  if (!isLoggedIn) {
    return (
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography width={350}>{t("notLoggedIn")}</Typography>
          <Button component={NavLink} to={routeLogin()} variant="text">
            {t("gotoLogin")}
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      {isLoggedIn && (
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
      )}
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
          />
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
              <Button
                onClick={() => {
                  setUserWorkshopsFilterInput({
                    liked: true,
                    owned: true,
                    isPublic: true,
                  });
                }}
                startIcon={<Filter />}
              >
                {t("ClearFilters")}
              </Button>
            </div>
          </div>
        ) : (
          <WorkshopCreateFirstComponent
            onCreateWorkshopClick={() => setIsCreateWorkshopDialogOpen(true)}
          ></WorkshopCreateFirstComponent>
        )}
        <CreateWorkshopDialog
          open={isCreateWorkshopDialogOpen}
          handleClose={() => setIsCreateWorkshopDialogOpen(false)}
        />
      </PageContentLoaderComponent>
    </Box>
  );
};
