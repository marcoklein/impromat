import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Account Page", () => {
  pageTest(
    "should render the account page if signed in",
    async ({ accountPage }) => {
      // given, when
      await accountPage.goto();
      // then
      await accountPage.expectToolbarTextToBe("Account");
    },
  );
});
