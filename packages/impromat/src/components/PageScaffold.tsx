import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { PropsWithChildren, useMemo } from "react";
import { routeRootNavigation } from "../routes/shared-routes";

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
}) => {
  const router = useIonRouter();
  const isNavRoute = useMemo(
    () => router.routeInfo.pathname.startsWith(routeRootNavigation()),
    [router],
  );

  return (
    <IonPage>
      {!noHeader && (
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              {!isNavRoute && (
                <IonBackButton defaultHref={defaultBackHref}></IonBackButton>
              )}
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
    </IonPage>
  );
};
