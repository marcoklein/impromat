import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Home Page", () => {
  pageTest("should render home page", async ({ homePage }) => {
    // given
    // when
    await homePage.goto();
    await homePage.homePageTabLocator.click();

    // then
    await expect(homePage.homePageTitleLocator).toBeVisible();
  });
});
