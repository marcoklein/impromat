import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useMemo } from "react";
import { useQuery } from "urql";
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { graphql } from "../../graphql-client";
import { useGoogleLoginHref } from "../../hooks/use-google-login-href";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { AccountOptionsMenu } from "./components/AccountOptionsMenu";
import { AccountSignIn } from "./components/AccountSignIn";
import { AccountSignedIn } from "./components/AccountSignedIn";

const AccountPage_Query = graphql(`
  query AccountPage_Query($userId: ID!) {
    user(id: $userId) {
      ...AccountOptionsMenu_User
      ...AccountSignedIn_User
    }
  }
`);

export const AccountPage: React.FC = () => {
  const { googleLoginHref, isGoogleLoginHrefFetching } = useGoogleLoginHref();
  const { isLoggedIn, myUserId } = useIsLoggedIn();

  const isLoading = isGoogleLoginHrefFetching;
  const isNotLoggedIn = !isLoggedIn;

  const [queryResult, reexecuteQuery] = useQuery({
    query: AccountPage_Query,
    pause: !isLoggedIn || !myUserId,
    variables: {
      userId: myUserId!,
    },
  });

  const myUser = useMemo(() => queryResult.data?.user, [queryResult]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            {!!queryResult.data?.user && (
              <AccountOptionsMenu
                userFragment={queryResult.data.user}
              ></AccountOptionsMenu>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading && <IonSpinner></IonSpinner>}
        {!isLoading && isLoggedIn && myUser && (
          <PageContentLoaderComponent
            queryResult={queryResult}
            reexecuteQuery={reexecuteQuery}
          >
            <AccountSignedIn userFragment={myUser}></AccountSignedIn>
          </PageContentLoaderComponent>
        )}
        {!isLoading &&
          isNotLoggedIn &&
          (!googleLoginHref ? (
            <>
              <InfoItemComponent
                color="warning"
                message="You need an active internet connection to login."
              ></InfoItemComponent>
            </>
          ) : (
            <AccountSignIn></AccountSignIn>
          ))}
      </IonContent>
    </IonPage>
  );
};
