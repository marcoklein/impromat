import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { PropsWithChildren } from "react";
import { useHistory } from "react-router";

interface ContainerProps extends PropsWithChildren {
  menuButtonElement?: JSX.Element;
  infoListElement?: JSX.Element;
  title: string;
  content?: string;
  routerLink?: string;
}

export const PreviewCard: React.FC<ContainerProps> = ({
  menuButtonElement,
  infoListElement,
  title,
  content,
  routerLink,
  children,
}) => {
  const history = useHistory();
  return (
    <IonCard
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignContent: "stretch",
      }}
    >
      <div
        onClick={routerLink ? () => history.push(routerLink) : undefined}
        style={{
          cursor: { routerLink } ? "pointer" : undefined,
          whiteSpace: "nowrap",
          overflowX: "auto",
          display: "flex",
          alignItems: "center",
          height: "2.5rem",
        }}
      >
        <div className="ion-margin-horizontal">{infoListElement}</div>
      </div>

      <div
        onClick={routerLink ? () => history.push(routerLink) : undefined}
        style={{ cursor: { routerLink } ? "pointer" : undefined, flexGrow: 1 }}
      >
        <IonCardHeader style={{ paddingTop: 0, paddingBottom: "0.2rem" }}>
          <IonCardTitle
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </IonCardTitle>
        </IonCardHeader>
        {content && (
          <IonCardContent style={{ paddingBottom: "0.1rem" }}>
            <span
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 3,
              }}
            >
              {content}
            </span>
          </IonCardContent>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        {menuButtonElement}
      </div>
      {children}
    </IonCard>
  );
};
