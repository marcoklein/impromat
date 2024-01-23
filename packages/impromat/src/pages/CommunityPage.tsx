import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useQuery } from "urql";
import { ElementPreviewCard } from "../components/ElementPreviewCard";
import { PageContentLoaderComponent } from "../components/PageContentLoaderComponent";
import { getFragmentData, graphql } from "../graphql-client";
import { TeaserGrid } from "./community/TeaserGrid";
import { WorkshopPreviewCard } from "./workshop/components/LegacyWorkshopPreviewCard";

const CommunityPage_Workshop = graphql(`
  fragment CommunityPage_Workshop on Workshop {
    id
    ...WorkshopPreviewItem_Workshop
  }
`);

const CommunityPage_Element = graphql(`
  fragment CommunityPage_Element on Element {
    id
    ...ElementPreviewItem_Element
  }
`);

const CommunityPageQuery = graphql(`
  query CommunityPageQuery(
    $workshopsWhereInput: WorkshopsWhereInput
    $elementsFilterInput: ElementsFilterInput
    $take: Int!
  ) {
    workshops(where: $workshopsWhereInput, take: $take) {
      ...CommunityPage_Workshop
    }
    elements(filter: $elementsFilterInput, take: $take) {
      element {
        ...CommunityPage_Element
      }
    }
  }
`);

export const CommunityPage: React.FC = () => {
  const [workshopsQueryResult, reexecuteWorkshopsQuery] = useQuery({
    query: CommunityPageQuery,
    variables: {
      workshopsWhereInput: {
        isListed: { equals: true },
      },
      elementsFilterInput: {
        isOwnerMe: false,
        isPublic: true,
      },
      take: 6,
    },
  });

  const availableWorkshops = getFragmentData(
    CommunityPage_Workshop,
    workshopsQueryResult.data?.workshops,
  );
  const latestElements = getFragmentData(
    CommunityPage_Element,
    workshopsQueryResult.data?.elements.map(({ element }) => element),
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Community</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <PageContentLoaderComponent
          queryResult={workshopsQueryResult}
          reexecuteQuery={reexecuteWorkshopsQuery}
        >
          {latestElements && (
            <TeaserGrid
              title="Latest Community Elements"
              items={latestElements}
              itemContent={(element) => (
                <ElementPreviewCard
                  elementFragment={element}
                ></ElementPreviewCard>
              )}
            ></TeaserGrid>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4
              style={{ flexGrow: "1" }}
              className="ion-no-margin ion-padding-top ion-padding-horizontal"
            >
              Latest Community Workshops
            </h4>
            {/* <IonButton slot="end" fill="clear">
              Show all
            </IonButton> */}
          </div>
          <IonGrid>
            <IonRow>
              {availableWorkshops &&
                availableWorkshops.map((workshop) => (
                  <IonCol
                    sizeXs="12"
                    sizeSm="6"
                    sizeMd="4"
                    style={{ height: "200px", width: "300px", padding: "4px" }}
                  >
                    <WorkshopPreviewCard
                      workshopFragment={workshop}
                    ></WorkshopPreviewCard>
                  </IonCol>
                ))}
            </IonRow>
          </IonGrid>
        </PageContentLoaderComponent>
      </IonContent>
    </IonPage>
  );
};
