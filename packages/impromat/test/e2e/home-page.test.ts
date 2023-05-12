import { expect } from "@playwright/test";
import { e2ePageTest } from "./fixtures/e2e-page-fixtures.js";
import { pageTest } from "../component/fixtures/page-fixtures.js";

pageTest.describe("Home Page", () => {
  e2ePageTest("should render home page.", async ({ homePage }) => {
    // given
    // when
    await homePage.goto();
    // then
    await expect(homePage.homePageTitleLocator).toBeVisible();
  });
});
