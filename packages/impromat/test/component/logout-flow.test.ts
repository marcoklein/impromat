import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Logout Flow", () => {
  pageTest(
    "should delete workshops on logout",
    async ({ auth, workshopsPage, accountPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopsPage.addWorkshop("test-workshop");
      await workshopsPage.goto();
      await expect(workshopsPage.page.getByText("test-workshop")).toBeVisible();
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
});
