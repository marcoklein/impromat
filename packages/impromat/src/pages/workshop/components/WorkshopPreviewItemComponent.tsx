import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonNote,
  IonPopover,
} from "@ionic/react";
import { calendar, close, ellipsisVertical, trash } from "ionicons/icons";
import { useMemo, useRef, useState } from "react";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useDeleteWorkshopMutation } from "../../../hooks/use-delete-workshop-mutation";
import { routeWorkshop } from "../../../routes/shared-routes";

const WorkshopPreviewItem_WorkshopFragment = graphql(`
  fragment WorkshopPreviewItem_Workshop on Workshop {
    id
    version
    createdAt
    updatedAt
    deleted
    name
    description
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopPreviewItem_WorkshopFragment>;
}

export const WorkshopPreviewItemComponent: React.FC<ContainerProps> = ({
  workshopFragment,
}) => {
  const workshop = getFragmentData(
    WorkshopPreviewItem_WorkshopFragment,
    workshopFragment,
  );
  const workshopCreatedAtText = useMemo(
    () => new Date(workshop.createdAt).toLocaleDateString(),
    [workshop],
  );
  const workshopUpdatedAtText = useMemo(
    () => new Date(workshop.updatedAt).toLocaleDateString(),
    [workshop],
  );
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const popover = useRef<HTMLIonPopoverElement>(null);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setIsOptionsMenuOpen(true);
  };

  const [, deleteWorkshopMutation] = useDeleteWorkshopMutation();

  return (
    <IonCard className="ion-no-margin">
      <IonButtons style={{ float: "right" }} className="ion-padding-top">
        <IonButton fill="clear" onClick={(event) => openPopover(event)}>
          <IonIcon icon={ellipsisVertical}></IonIcon>
        </IonButton>
      </IonButtons>
      <IonCardHeader>
        <IonCardTitle>{workshop.name}</IonCardTitle>
        {workshop.description && (
          <IonCardSubtitle>{workshop.description}</IonCardSubtitle>
        )}
      </IonCardHeader>
      <IonCardContent>
        <IonNote>
          <IonButton
            fill="clear"
            size="small"
            color="medium"
            id={`updated-and-created-popover-${workshop.id}`}
          >
            <IonIcon icon={calendar} slot="start"></IonIcon>
            {workshopUpdatedAtText}
          </IonButton>
          <IonPopover
            trigger={`updated-and-created-popover-${workshop.id}`}
            triggerAction="click"
          >
            <IonContent class="ion-padding">
              <IonIcon icon={calendar}></IonIcon> {workshopUpdatedAtText}{" "}
              (updated)
            </IonContent>
            <IonContent class="ion-padding">
              <IonIcon icon={calendar}></IonIcon> {workshopCreatedAtText}{" "}
              (created)
            </IonContent>
          </IonPopover>
        </IonNote>
      </IonCardContent>
      <IonButton
        fill="clear"
        expand="full"
        routerLink={routeWorkshop(workshop.id)}
      >
        Open
      </IonButton>

      {/* TODO create reusable options menu that is responsive and can switch between an action sheet and a popover version + hide buttons in the menu if necessary */}
      <IonPopover
        className="ion-hide"
        ref={popover}
        isOpen={isOptionsMenuOpen}
        onDidDismiss={() => setIsOptionsMenuOpen(false)}
      >
        <IonList lines="none">
          <IonItem onClick={() => {}}>Test</IonItem>
          <IonItem onClick={() => {}}>Test</IonItem>
        </IonList>
      </IonPopover>
      <IonActionSheet
        // className="ion-hide-xl-up"
        isOpen={isOptionsMenuOpen}
        header={workshop.name}
        buttons={[
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              deleteWorkshopMutation({ id: workshop.id });
            },
            data: {
              action: "delete",
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            icon: close,
            data: {
              action: "cancel",
            },
          },
        ]}
        onDidDismiss={() => setIsOptionsMenuOpen(false)}
      ></IonActionSheet>
    </IonCard>
  );
};
