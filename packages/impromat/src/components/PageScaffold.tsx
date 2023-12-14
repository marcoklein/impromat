import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { arrowBack, chevronBack } from "ionicons/icons";
import { PropsWithChildren, useEffect } from "react";

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
  secondaryToolbar?: JSX.Element | null;
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
  secondaryToolbar,
  customContentWrapper,
  toolbarButtons,
  defaultBackHref,
  footer,
  showProgressBar,
}) => {
  useEffect(() => {
    document.title = title || "";
  }, [title]);
  return (
    <IonPage>
      {!noHeader && (
        <IonHeader>
          {(defaultBackHref || title || toolbarButtons) && (
            <IonToolbar>
              <IonButtons slot="start">
                {isPlatform("ios") ? (
                  <IonButton
                    routerLink={defaultBackHref}
                    shape="round"
                    aria-label="back"
                  >
                    <IonIcon icon={chevronBack} slot="start"></IonIcon>
                    Back
                  </IonButton>
                ) : (
                  <IonButton
                    routerLink={defaultBackHref}
                    shape="round"
                    aria-label="back"
                  >
                    <IonIcon icon={arrowBack} slot="icon-only"></IonIcon>
                  </IonButton>
                )}
              </IonButtons>
              <IonTitle>
                <IonLabel className="ion-text-wrap">{title}</IonLabel>
              </IonTitle>
              <IonButtons slot="end">{toolbarButtons}</IonButtons>
            </IonToolbar>
          )}
          {secondaryToolbar}
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
