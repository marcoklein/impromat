import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  buttonsElement: JSX.Element;
  infoListElement?: JSX.Element;
  titleElement: JSX.Element;
  /**
   * Triggered, if card header or content is clicked.
   * Will not trigger if a button or the info list is clicked.
   */
  onCardClick: () => void;
}

export const PreviewCard: React.FC<ContainerProps> = ({
  buttonsElement: buttons,
  infoListElement,
  titleElement,
  children,
  onCardClick,
}) => {
  return (
    <IonCard
      className="ion-no-margin"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div style={{ overflow: "hidden", flexGrow: 1 }}>
        <div
          className="ion-margin-end ion-margin-top ion-float-right"
          style={{
            maxWidth: "50%",
            textOverflow: "ellipsis",
          }}
        >
          {infoListElement}
        </div>
        <IonCardHeader onClick={() => onCardClick && onCardClick()}>
          <IonCardTitle>{titleElement}</IonCardTitle>
        </IonCardHeader>
        <span onClick={() => onCardClick && onCardClick()}>{children}</span>
      </div>
      <div style={{ display: "flex" }}>{buttons}</div>
    </IonCard>
  );
};
