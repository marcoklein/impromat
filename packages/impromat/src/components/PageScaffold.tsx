import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  defaultBackHref?: string;
  toolbarButtons?: JSX.Element | null;
  title?: string;
  noHeader?: boolean;
  /**
   * If set, the content will not be wrapped in a `IonContent` component.
   * Use, if you want to use a custom wrapper e.g. for getting scroll events.
   *
   * @default false
   */
  customContentWrapper?: boolean;
  bottomToolbar?: JSX.Element | null;
  footer?: JSX.Element | null;
  showProgressBar?: boolean;
}

/**
 * A reusable page scaffold component for Ionic React apps.
 */
export const PageScaffold: React.FC<ContainerProps> = ({
  children,
  title,
  noHeader,
  bottomToolbar,
  customContentWrapper,
  toolbarButtons,
  defaultBackHref,
  footer,
  showProgressBar,
}) => {
  return (
    <IonPage>
      {!noHeader && (
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref={defaultBackHref}></IonBackButton>
            </IonButtons>
            <IonTitle>
              <IonLabel className="ion-text-wrap">{title}</IonLabel>
            </IonTitle>
            <IonButtons slot="end">{toolbarButtons}</IonButtons>
          </IonToolbar>
          {bottomToolbar}
        </IonHeader>
      )}
      {customContentWrapper ? children : <IonContent>{children}</IonContent>}
      {footer && <IonFooter>{footer}</IonFooter>}
      {showProgressBar && (
        <IonProgressBar type="indeterminate"></IonProgressBar>
      )}
    </IonPage>
  );
};
