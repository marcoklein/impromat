import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
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
import { getFragmentData, graphql } from "../graphql-client";
import { useComponentLogger } from "../hooks/use-component-logger";
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

export const ExplorePage: React.FC = () => {
  const logger = useComponentLogger("ExplorePage");

  const [workshopsQueryResult, reexecuteWorkshopsQuery] = useQuery({
    query: ExplorePageQuery,
    variables: {
      userWorkshopsFilterInput: {
        owned: true,
      },
      take: 5,
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
          <IonTitle>Explore</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" scrollX={true}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4 style={{ flexGrow: "1" }} className="ion-no-margin">
            Latest Workshops
          </h4>
          <IonButton slot="end" fill="clear">
            Show all
          </IonButton>
        </div>
        <IonGrid>
          <IonRow style={{ maxHeight: "200px", overflow: "hidden" }}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h4 style={{ flexGrow: "1" }}>Explore Elements</h4>
          <IonButton slot="end" fill="clear">
            Show all
          </IonButton>
        </div>
        <IonGrid>
          <IonRow style={{ maxHeight: "200px", overflow: "hidden" }}>
            {availableWorkshops &&
              availableWorkshops.map((workshop) => (
                <IonCol
                  sizeXs="12"
                  sizeSm="6"
                  sizeMd="4"
                  style={{ height: "200px", width: "300px", padding: "4px" }}
                >
                  <IonCard
                    className="ion-no-margin"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonCardHeader>
                      <IonCardTitle>Latest Elements</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
