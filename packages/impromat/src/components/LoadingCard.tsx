import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSkeletonText,
} from "@ionic/react";

/**
 * Card Layout with text skeletons.
 */
export const LoadingCard: React.FC = () => (
  <IonCard className="ion-no-margin">
    <IonCardHeader>
      <IonCardTitle>
        <IonSkeletonText animated></IonSkeletonText>
      </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <IonSkeletonText animated></IonSkeletonText>
    </IonCardContent>
    <IonCardContent>
      <IonSkeletonText animated></IonSkeletonText>
    </IonCardContent>
    <IonCardContent>
      <IonSkeletonText animated></IonSkeletonText>
    </IonCardContent>
  </IonCard>
);
