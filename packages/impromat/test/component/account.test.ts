import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Account Page", () => {
  pageTest("should login and logout", async ({ accountPage }) => {
    await pageTest.step("should login", async () => {
      // given
      await accountPage.goto();
      // when
      await accountPage.login();
      // then
      await accountPage.mySpaceTabLocator.click();
      await expect(accountPage.logoutLocator).toBeVisible();
    });
    await pageTest.step("should logout", async () => {
      // when
      await accountPage.logout();
      // then
      await accountPage.loginTabLocator.isVisible();
    });
  });
});
