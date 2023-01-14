import { expect } from "@playwright/test";
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

  pageTest("should sign in", async ({ page, accountPage }) => {
    // given
    await accountPage.goto();
    await accountPage.logout();
    // when
    await page.waitForTimeout(1000); // timeout necessary due to google sign in button not loading immediately
    await page.locator("ion-button.google-sign-in-button").last().click();
    // then
    await expect(page.getByText(/You are signed in/)).toBeVisible();
  });
});
