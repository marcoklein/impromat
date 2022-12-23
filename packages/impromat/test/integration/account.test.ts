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

  pageTest("should logout if signed in", async ({ page, accountPage }) => {
    // given
    await accountPage.goto();
    // when
    await accountPage.logout();
    // then
    await accountPage.expectToolbarTextToBe("Account");
  });
});
