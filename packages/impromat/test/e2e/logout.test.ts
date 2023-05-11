import { changePageAuthenticationCookie } from "./fixtures/change-page-authentication-cookie.js";
import { e2ePageTest } from "./fixtures/e2e-page-fixtures.js";

// TODO login functionality for e2e test is not implemented yet
e2ePageTest.skip("Logout", () => {
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
