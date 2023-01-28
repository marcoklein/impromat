import { changePageAuthenticationCookie } from "./change-page-authentication-cookie";
import { e2ePageTest } from "./e2e-page-fixtures";

e2ePageTest.describe("Logout", () => {
  e2ePageTest(
    "should logout",
    async ({ page, prepareLoggedInSession, accountPage }) => {
      // given
      await prepareLoggedInSession();
      // when
      await changePageAuthenticationCookie(page, "invalid_secret");
      // then
      await accountPage.expectToBeSignedOut();
    },
  );
});
