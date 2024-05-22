import { expect } from "@playwright/test";
import { version } from "../../src/version.gen.js";
import { e2ePageTest } from "./fixtures/e2e-page-fixtures.js";

e2ePageTest.describe("Home Page", () => {
  e2ePageTest("should render home page.", async ({ homePage }) => {
    // given
    // when
    await homePage.goto();
    // then
    await expect(homePage.homePageTitleLocator).toBeVisible();
  });

  e2ePageTest("should display expected version", async ({ page, homePage }) => {
    // given
    const expectedVersion = `v${version}`;
    // when
    await homePage.goto();
    // then
    await expect(page.getByText(expectedVersion)).toBeVisible();
  });
});
