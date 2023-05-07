import {
  IonActionSheet,
  IonButton,
  IonCardContent,
  IonIcon,
  IonItem,
  IonList,
  IonPopover,
} from "@ionic/react";
import { close, ellipsisVertical, trash } from "ionicons/icons";
import { useRef, useState } from "react";
import { PreviewCard } from "../../../components/PreviewCard";
import { WorkshopInfoList } from "../../../components/WorkshopInfoList";
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
    ...WorkshopInfoList_Workshop
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopPreviewItem_WorkshopFragment>;
}

export const WorkshopPreviewCard: React.FC<ContainerProps> = ({
  workshopFragment,
}) => {
  const workshop = getFragmentData(
    WorkshopPreviewItem_WorkshopFragment,
    workshopFragment,
  );
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const popover = useRef<HTMLIonPopoverElement>(null);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setIsOptionsMenuOpen(true);
  };

  const [, deleteWorkshopMutation] = useDeleteWorkshopMutation();

  return (
    <PreviewCard
      infoListElement={
        <WorkshopInfoList workshopFragment={workshop}></WorkshopInfoList>
      }
      titleElement={<>{workshop.name}</>}
      buttonsElement={
        <>
          <IonButton
            style={{ flexGrow: 1 }}
            fill="clear"
            routerLink={routeWorkshop(workshop.id)}
          >
            Open
          </IonButton>
          <IonButton fill="clear" onClick={(event) => openPopover(event)}>
            <IonIcon icon={ellipsisVertical}></IonIcon>
          </IonButton>
        </>
      }
    >
      <IonCardContent>{workshop.description}</IonCardContent>
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
    </PreviewCard>
  );
};
