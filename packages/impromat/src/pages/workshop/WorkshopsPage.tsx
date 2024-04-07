import {
  Box,
  Card,
  CardContent,
  Container,
  Fab,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { IsNotLoggedIn } from "../../components/IsNotLoggedIn";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { PageScaffold } from "../../components/PageScaffold";
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
    <PageScaffold noHeader>
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
            headerElement={
              <IsNotLoggedIn>
                <Container maxWidth="sm" sx={{ height: "100%", p: 0 }}>
                  <Card
                    sx={{
                      m: 1,
                      border: "solid 1px",
                      borderColor: "primary.main",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        {t("communityWorkshopsTitle")}
                      </Typography>
                      <Typography variant="body2">
                        {t("communityWorkshopsDescription")}
                      </Typography>
                      <Box mt={1}>
                        <Typography variant="body2">
                          {t("communityWorkshopsDescriptionSecondary")}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Container>
              </IsNotLoggedIn>
            }
            itemContent={(_index, workshop) => (
              <Container maxWidth="sm" sx={{ height: "100%", p: 0 }}>
                <WorkshopPreviewCard
                  workshopFragment={workshop}
                ></WorkshopPreviewCard>
              </Container>
            )}
          />
        ) : (
          <IsLoggedIn>
            <WorkshopCreateFirstComponent
              onCreateWorkshopClick={() => setIsCreateWorkshopDialogOpen(true)}
            ></WorkshopCreateFirstComponent>
          </IsLoggedIn>
        )}
        <CreateWorkshopDialog
          open={isCreateWorkshopDialogOpen}
          handleClose={() => setIsCreateWorkshopDialogOpen(false)}
        />
      </PageContentLoaderComponent>
    </PageScaffold>
  );
};
