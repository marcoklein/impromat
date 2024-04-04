import { expect } from "@playwright/test";
import { e2ePageTest } from "./fixtures/e2e-page-fixtures.js";

e2ePageTest.describe("Home Page", () => {
  e2ePageTest("should render home page.", async ({ homePage }) => {
    // given
    // when
    await homePage.goto();
    // then
    await expect(homePage.homePageTitleLocator).toBeVisible();
  });
});
