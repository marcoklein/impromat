import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Home Page", () => {
  pageTest("should render home page if not signed in", async ({ page }) => {
    // given
    // when
    await page.goto("/");
    // then
    await expect(page.getByText(/Welcome to Impromat/)).toBeVisible();
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
