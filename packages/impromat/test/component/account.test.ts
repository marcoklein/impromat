import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Account Page", () => {
  pageTest("should sign in", async ({ page, accountPage }) => {
    // given
    // when
    await accountPage.login();
    await accountPage.goto();
    // then
    await expect(page.getByText(/You are signed in/)).toBeVisible();
  });

  pageTest(
    "should render the account page if signed in",
    async ({ accountPage, page }) => {
      // given
      await accountPage.goto();
      // when
      await accountPage.login();
      await accountPage.goto();
      // then
      await accountPage.expectToolbarTextToBe("Account");
    },
  );

  pageTest("should logout if signed in", async ({ page, accountPage }) => {
    // given
    await accountPage.login();
    // when
    await accountPage.logout();
    await accountPage.goto();
    // then
    await accountPage.expectToolbarTextToBe("Account");
  });
});
