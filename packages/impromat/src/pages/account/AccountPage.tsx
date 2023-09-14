import { IonSpinner } from "@ionic/react";
import { useMemo } from "react";
import { useQuery } from "urql";
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { graphql } from "../../graphql-client";
import { useGoogleLoginHref } from "../../hooks/use-google-login-href";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { AccountOptionsMenu } from "./components/AccountOptionsMenu";
import { AccountSignIn } from "./components/AccountSignIn";
import { AccountSignedIn } from "./components/AccountSignedIn";

const AccountPage_Query = graphql(`
  query AccountPage_Query($userId: ID!) {
    user(id: $userId) {
      id
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
    <PageScaffold
      title="Profile"
      toolbarButtons={
        myUser && (
          <AccountOptionsMenu userFragment={myUser}></AccountOptionsMenu>
        )
      }
    >
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
    </PageScaffold>
  );
};
