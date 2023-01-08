import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useRxdbMutations } from "../../database/use-rxdb-mutations";
import { useWorkshops } from "../../database/use-workshops";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";

export const WorkshopsPage: React.FC = () => {
  const logger = useComponentLogger("WorkshopsPage");
  const database = useRxdbMutations();
  const { workshops: availableWorkshops, isFetching } = useWorkshops();
  const history = useHistory();
  const [presentInputDialog] = useInputDialog();

  const createWorkshopClick = useCallback(() => {
    presentInputDialog({
      header: "Workshop Name",
      message: "Enter a name for your workshop. You can change it later.",
      emptyInputMessage: "Please enter a name for your workshop.",
      onAccept: async (text) => {
        if (!database) return;
        const id = await database.addWorkshop(text, "");
        logger("Adding new workshop with id %s", id);
        const navigateTo = `/workshop/${id}`;
        history.replace(navigateTo);
        logger("Navigating to %s", navigateTo);
      },
    });
  }, [logger, presentInputDialog, history, database]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Workshops</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => createWorkshopClick()}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {isFetching ? (
          <IonSpinner></IonSpinner>
        ) : availableWorkshops.length ? (
          <IonList>
            {availableWorkshops.map((workshop) => (
              <IonItem
                key={workshop.id}
                routerLink={`/workshop/${workshop.id}`}
              >
                <IonLabel>{workshop.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <div
            className="ion-padding"
            style={{
              minHeight: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p>Start by creating your very first workshop:</p>
            <IonButton expand="full" onClick={() => createWorkshopClick()}>
              <IonIcon slot="start" icon={add}></IonIcon>
              Add Workshop
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
