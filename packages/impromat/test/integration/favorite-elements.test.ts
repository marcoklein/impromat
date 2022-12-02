import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Favorite Elements", () => {
  pageTest("should add a favorite element", async ({ page, workshopPage }) => {
    await pageTest.step("should add a favorite element", async () => {
      // given
      await workshopPage.createAndGoto();
      await workshopPage.gotoElementFromSearch();
      // when
      await page
        .locator('ion-button:has-text("Star")')
        .getByRole("button")
        .click();
      // TODO requires login of user
    });
  });
});
