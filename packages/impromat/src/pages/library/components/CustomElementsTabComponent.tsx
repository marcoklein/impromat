import { IonFab, IonFabButton, IonIcon, IonSpinner } from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { useQuery } from "urql";
import { ElementPreviewCard } from "../../../components/ElementPreviewCard";
import { VirtualCardGrid } from "../../../components/VirtualCardGrid";
import { getFragmentData, graphql } from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useIsLoggedIn } from "../../../hooks/use-is-logged-in";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import {
  routeLibraryCreateCustomElement,
  routeLibraryElement,
} from "../library-routes";
import { CustomElementsEmptyComponent } from "./CustomElementsEmptyComponent";

const CustomElementsTab_WorkshopFragment = graphql(`
  fragment CustomElementsTab_WorkshopFragment on User {
    elements {
      id
      name
      ...ElementPreviewItem_Element
    }
  }
`);

const MyUser_Query = graphql(`
  query CustomElementsTab_Query($userId: ID!) {
    user(id: $userId) {
      id
      ...CustomElementsTab_WorkshopFragment
    }
  }
`);

interface ContainerProps {
  workshopId: string | undefined;
}

export const CustomElementsTabComponent: React.FC<ContainerProps> = ({
  workshopId,
}) => {
  const location = useLocation();
  const logger = useComponentLogger("CustomElementsTabComponent");
  const { myUserId } = useIsLoggedIn();

  const context = useMemo(() => ({ additionalTypenames: ["Element"] }), []);
  const [{ data, fetching: isFetching }] = useQuery({
    query: MyUser_Query,
    context,
    pause: !myUserId,
    variables: {
      userId: myUserId!,
    },
  });

  const user = getFragmentData(CustomElementsTab_WorkshopFragment, data?.user);
  const customElements = user?.elements;

  useEffect(() => {
    logger("location=%s", location.pathname);
    logger("state=%O", location.state);
  }, [location, logger]);

  useStateChangeLogger(customElements, "customElements", logger);
  useEffect(() => {
    logger("customElements.length=%s", customElements?.length);
  }, [logger, customElements]);

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton
          color="primary"
          routerLink={routeLibraryCreateCustomElement({ workshopId })}
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      {isFetching ? (
        <IonSpinner></IonSpinner>
      ) : !customElements?.length ? (
        <CustomElementsEmptyComponent></CustomElementsEmptyComponent>
      ) : (
        <VirtualCardGrid
          scrollStoreKey="custom-elements-tab-component"
          isFetching={isFetching}
          items={customElements}
          itemContent={(_index, element) => (
            <ElementPreviewCard
              key={element.id}
              routerLink={routeLibraryElement(element.id, { workshopId })}
              elementFragment={element}
            ></ElementPreviewCard>
          )}
        ></VirtualCardGrid>
      )}
    </>
  );
};
