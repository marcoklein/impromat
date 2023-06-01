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
import { PageContentLoaderComponent } from "../components/PageContentLoaderComponent";
import { getFragmentData, graphql } from "../graphql-client";
import { WorkshopPreviewCard } from "./workshop/components/WorkshopPreviewCard";

const ExplorePage_WorkshopFragment = graphql(`
  fragment WorkshopFields_Workshop on Workshop {
    id
    ...WorkshopPreviewItem_Workshop
  }
`);

const ExplorePageQuery = graphql(`
  query ExplorePageQuery(
    $userWorkshopsFilterInput: UserWorkshopsFilterInput
    $take: Int!
  ) {
    me {
      workshops(input: $userWorkshopsFilterInput, take: $take) {
        ...WorkshopFields_Workshop
      }
    }
  }
`);

export const CommunityPage: React.FC = () => {
  const [workshopsQueryResult, reexecuteWorkshopsQuery] = useQuery({
    query: ExplorePageQuery,
    variables: {
      userWorkshopsFilterInput: {
        liked: false,
        owned: false,
        isPublic: true,
      },
      take: 6,
    },
  });

  const availableWorkshops = getFragmentData(
    ExplorePage_WorkshopFragment,
    workshopsQueryResult.data?.me.workshops,
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
