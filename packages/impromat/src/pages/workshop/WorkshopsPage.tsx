import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";
import { ImpromatHero } from "../../components/ImpromatHero";
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
import { LoginCard } from "./components/LoginCard";
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
  const { t, i18n } = useTranslation("WorkshopsPage");

  const { myUserId, isLoggedIn } = useIsLoggedIn();

  const languageCodes = useMemo(
    () => (isLoggedIn ? undefined : [i18n.language]),
    [i18n.language, isLoggedIn],
  );
  const [workshopsQueryResult, reexecuteWorkshopsQuery] = useQuery({
    query: WorkshopsPage_Query,
    variables: {
      workshopSearchInput: {
        languageCodes,
      },
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
        {IsNotLoggedIn || availableWorkshops?.length ? (
          <VirtualCardGrid
            scrollStoreKey="workshops-page"
            isFetching={
              workshopsQueryResult.fetching || workshopsQueryResult.stale
            }
            onTopStateChange={(atTop) => setGridIsOnTop(atTop)}
            items={availableWorkshops ?? []}
            headerElement={
              <IsNotLoggedIn>
                <Box my={2}>
                  <ImpromatHero />
                </Box>
              </IsNotLoggedIn>
            }
            itemContent={(_index, workshop) => (
              <Container maxWidth="sm" sx={{ height: "100%", p: 0 }}>
                <WorkshopPreviewCard
                  workshopFragment={workshop}
                ></WorkshopPreviewCard>
              </Container>
            )}
            footerElement={
              <IsNotLoggedIn>
                <Container maxWidth="sm" sx={{ p: 0 }}>
                  <LoginCard />
                </Container>
              </IsNotLoggedIn>
            }
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
