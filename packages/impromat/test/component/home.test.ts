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

  pageTest("should render jump pad if signed in", async ({ page, auth }) => {
    // given
    await auth.loginAsRandomUser();
    // when
    await page.goto("/");
    // then
    await expect(
      page
        .locator("div.ion-page")
        .getByRole("link", { name: "Workshops" })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator("div.ion-page")
        .getByRole("link", { name: "Elements" })
        .first(),
    ).toBeVisible();
  });
});
