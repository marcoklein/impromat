import { useIsLoggedIn } from "../hooks/use-is-logged-in";
import { HomeLoggedIn } from "./home/HomeLoggedIn";
import { HomeLoggedOut } from "./home/HomeLoggedOut";

/**
 * Purpose of the landing/home page is to provide a quick overview of the app and inform the user about all available features.
 * The user needs to sign in to use the app. Therefore, it should only point to the sign in page.
 */
export const HomePage: React.FC = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <>
      {isLoggedIn && <HomeLoggedIn></HomeLoggedIn>}
      {!isLoggedIn && <HomeLoggedOut></HomeLoggedOut>}
    </>
  );
};
