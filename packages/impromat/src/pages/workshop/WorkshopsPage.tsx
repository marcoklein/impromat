import { Box, Fab } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { VirtualCardGrid } from "../../components/VirtualCardGrid";
import { AddNewWorkshopIcon } from "../../components/icons/AddNewWorkshopIcon";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { CreateWorkshopDialog } from "../library/CreateWorkshopDialog";
import { WorkshopCreateFirstComponent } from "./components/WorkshopCreateFirstComponent";
import { WorkshopPreviewCard } from "./components/WorkshopPreviewCard";

const WorkshopFields_Workshop = graphql(`
  fragment WorkshopFields_Workshop on Workshop {
    id
    ...WorkshopPreviewItem_Workshop
  }
`);

const WorkshopsPage_Query = graphql(`
  query WorkshopsPage_Query($workshopSearchInput: WorkshopSearchInput!) {
    searchWorkshops(input: $workshopSearchInput) {
      workshop {
        ...WorkshopFields_Workshop
      }
    }
  }
`);

export const WorkshopsPage: React.FC = () => {
  const logger = useComponentLogger("WorkshopsPage");

  const { myUserId, isLoggedIn } = useIsLoggedIn();

  const [workshopsQueryResult, reexecuteWorkshopsQuery] = useQuery({
    query: WorkshopsPage_Query,
    variables: {
      workshopSearchInput: {},
    },
  });
  useStateChangeLogger(myUserId, "myUserId", logger);
  useStateChangeLogger(
    workshopsQueryResult.fetching,
    "workshopsQueryResult.fetching",
    logger,
  );

  const availableWorkshops = getFragmentData(
    WorkshopFields_Workshop,
    workshopsQueryResult.data?.searchWorkshops.map((r) => r.workshop),
  );

  const [gridIsOnTop, setGridIsOnTop] = useState<boolean>(false);
  useStateChangeLogger(gridIsOnTop, "gridIsOnTop", logger);

  const [isCreateWorkshopDialogOpen, setIsCreateWorkshopDialogOpen] =
    useState(false);

  const { t } = useTranslation("WorkshopsPage");

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
