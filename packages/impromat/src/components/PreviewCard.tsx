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
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "0",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          minHeight: "0",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "0",
            overflow: "scroll",
          }}
        >
          <IonCardHeader
            onClick={() => onCardClick && onCardClick()}
            style={{
              marginBottom: "0px",
              paddingBottom: "0px",
            }}
          >
            <IonCardTitle>{titleElement}</IonCardTitle>
          </IonCardHeader>
          <div
            style={{ flexGrow: 1, minHeight: "0" }}
            onClick={() => onCardClick && onCardClick()}
          >
            {children}
          </div>
        </div>
        <div
          className="ion-padding"
          style={{
            flexGrow: 1,
            maxWidth: "50%",
            textOverflow: "ellipsis",
            minHeight: "0",
            borderLeft: "1px solid var(--ion-color-light)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {infoListElement}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            {buttons}
          </div>
        </div>
      </div>
    </IonCard>
  );
};
