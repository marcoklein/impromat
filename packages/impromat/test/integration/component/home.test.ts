import { expect } from "@playwright/test";
import { version } from "../../../src/version.gen.js";
import { pageTest } from "../fixtures/page-fixtures.js";

pageTest.describe("Home Page", () => {
  pageTest("should render home page", async ({ homePage }) => {
    // given
    // when
    await homePage.goto();
    await homePage.homePageTabLocator.click();

    // then
    await expect(homePage.homePageTitleLocator).toBeVisible();
  });

  pageTest("should display expected version", async ({ page, homePage }) => {
    // given
    const expectedVersion = `v${version}`;
    // when
    await homePage.goto();
    // then
    await expect(page.getByText(expectedVersion)).toBeVisible();
  });
});
