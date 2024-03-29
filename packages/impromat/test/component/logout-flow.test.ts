import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Logout Flow", () => {
  pageTest(
    "should delete workshops on logout",
    async ({ page, auth, workshopsPage, accountPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      await workshopsPage.addWorkshop("test-workshop");
      await workshopsPage.goto();
      // when
      await accountPage.goto();
      await accountPage.logout();
      await workshopsPage.goto();
      // then
      await expect(
        workshopsPage.page.getByText("test-workshop"),
      ).not.toBeVisible();
    },
  );

  pageTest("should logout", async ({ auth, page, accountPage }) => {
    // given
    await auth.loginAsRandomUser();
    // when
    await accountPage.goto();
    await accountPage.logout();
    // then
    await expect(page).toHaveURL("/nav/my-space");
  });
});
