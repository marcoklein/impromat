import { PageScaffold } from "../../components/PageScaffold";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useSearchParam } from "../../hooks/use-search-params";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { routeWorkshop } from "../../routes/shared-routes";
import { LibraryContentComponent } from "./components/LibraryContentComponent";
import { WORKSHOP_CONTEXT_SEARCH_PARAM } from "./workshop-context-search-param";

export const LibraryPage: React.FC = () => {
  const workshopId = useSearchParam(WORKSHOP_CONTEXT_SEARCH_PARAM);
  const logger = useComponentLogger("LibraryPage");
  useStateChangeLogger(workshopId, "workshopId from params", logger);
  return (
    <PageScaffold
      customContentWrapper
      defaultBackHref={workshopId && routeWorkshop(workshopId)}
      title={workshopId ? "Add Element" : "Element Library"}
    >
      <LibraryContentComponent
        workshopId={workshopId}
      ></LibraryContentComponent>
    </PageScaffold>
  );
};
