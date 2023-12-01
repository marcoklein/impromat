import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Logout Flow", () => {
  pageTest(
    "should delete workshops on logout",
    async ({ auth, workshopsPage, accountPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopsPage.addWorkshop("test-workshop");
      await workshopsPage.goto();
      await workshopsPage.expectToShowWorkshopWithName("test-workshop");
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

  pageTest(
    "should show logout confirmation page on logout",
    async ({ auth, page, accountPage }) => {
      // given
      await auth.loginAsRandomUser();
      // when
      await accountPage.goto();
      await accountPage.logout();
      // then
      await expect(page).toHaveURL("/nav/home");
      await expect(page.getByText("You have been logged out.")).toBeVisible();
    },
  );
});
