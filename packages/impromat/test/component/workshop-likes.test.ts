import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Workshop Likes", () => {
  pageTest(
    "should like shared workshop of other user",
    async ({ page, auth, workshopPage, workshopsPage, accountPage }) => {
      // given
      const uniqueWorkshopName = `workshop-${randomUUID()}`;
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      await workshopPage.createAndGoto(uniqueWorkshopName);
      await workshopPage.shareViaLink();
      const workshopUrl = page.url();
      await accountPage.goto();
      await accountPage.logout();
      await auth.loginAsRandomUser();
      // when
      await page.goto(workshopUrl);
      await workshopPage.like();
      await workshopsPage.goto();
      // then
      await expect(page.getByText(uniqueWorkshopName)).toBeVisible();
      await expect(page.getByText("liked")).toBeVisible();
    },
  );
});
