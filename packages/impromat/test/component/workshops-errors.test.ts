import { expect } from "@playwright/test";
import {
  blockImpromatApiRequests,
  unblockImpromatApiRequests,
} from "./fixtures/block-api-requests.js";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Workshops Errors Page", () => {
  // TODO disabled because of Refresher not working properly with grid
  pageTest.skip(
    "should show a network error notification",
    async ({ page, auth, workshopsPage }) => {
      // given
      await auth.loginAsRandomUser();
      // when
      await blockImpromatApiRequests(page);
      await workshopsPage.goto();
      // then
      await expect(page.getByRole("button", { name: "Retry" })).toBeVisible();
    },
  );

  // TODO disabled because of Refresher not working properly with grid
  pageTest.skip(
    "should reload page on network error retry",
    async ({ page, auth, workshopsPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopsPage.addWorkshop("testworkshop");
      await blockImpromatApiRequests(page);
      await workshopsPage.goto();
      // when
      await page.getByRole("button", { name: "Retry" }).click();
      await unblockImpromatApiRequests(page);
      // then
      await expect(page.getByText("testworkshop").first()).toBeVisible();
    },
  );
});
