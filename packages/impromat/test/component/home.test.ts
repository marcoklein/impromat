import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Home Page", () => {
  pageTest("should render home page if not signed in", async ({ homePage }) => {
    // given
    // when
    await homePage.goto();
    // then
    await expect(homePage.homePageTitleLocator).toBeVisible();
  });
});
