import { expect } from "@playwright/test";
import { pageTest } from "../component/fixtures/page-fixtures.js";
import { e2ePageTest } from "./fixtures/e2e-page-fixtures.js";

pageTest("Home Page", () => {
  e2ePageTest("should render home page.", async ({ homePage }) => {
    // given
    // when
    await homePage.goto();
    // then
    await expect(homePage.homePageTitleLocator).toBeVisible();
  });
});
