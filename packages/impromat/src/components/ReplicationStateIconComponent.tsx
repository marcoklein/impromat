import { IonIcon, IonSpinner } from "@ionic/react";
import { checkmark, warning, wifi } from "ionicons/icons";
import { ReplicationStateEnum } from "../database/collections/replication-state";
import { useReplicationState } from "../database/use-replication-state";

interface ContainerProps {}

export const ReplicationStateIconComponent: React.FC<ContainerProps> = () => {
  const { state, stateColor } = useReplicationState();
  switch (state) {
    case ReplicationStateEnum.SYNCED:
      return <IonIcon icon={checkmark} color={stateColor}></IonIcon>;
    case ReplicationStateEnum.ERROR:
      return <IonIcon icon={warning} color={stateColor}></IonIcon>;
    case ReplicationStateEnum.NO_CONNECTION:
      return <IonIcon icon={wifi} color={stateColor}></IonIcon>;
    default:
      return <IonSpinner></IonSpinner>;
  }
};
