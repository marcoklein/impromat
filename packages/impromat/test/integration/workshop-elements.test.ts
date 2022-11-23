import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Workshop Elements Page", () => {
  pageTest("should rename a new workshop", async ({ page, workshopPage }) => {
    // given
    await workshopPage.createAndGoto("workshop name");
    // when
    await workshopPage.rename("renamed workshop name");
    // then
    await page.waitForSelector('text="renamed workshop name"');
  });
});
