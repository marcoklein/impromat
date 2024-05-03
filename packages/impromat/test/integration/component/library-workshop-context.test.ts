import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "../fixtures/page-fixtures.js";

pageTest.describe("Library with Workshop Context", () => {
  pageTest(
    "should render the library page",
    async ({
      auth,
      workshopPage,
      workshopsPage,
      page,
      libraryPage,
      workshopElementPage,
    }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      const workshopName = `Test Workshop ${randomUUID()}`;
      await workshopPage.createAndGoto(workshopName);

      await pageTest.step("should render the library page", async () => {
        // when
        await workshopPage.openLibraryToAddNewElement();
        // then
        await expect(page).toHaveURL(/.*\/nav\/elements/);
      });

      await pageTest.step("should add Freeze to workshop", async () => {
        // when
        await libraryPage.gotoFirstElementFromSearch();
        await workshopElementPage.addToWorkshop(workshopName);
        // then
        await expect(
          workshopPage.getElementByNameLocator("Freeze"),
        ).toBeVisible();
      });
    },
  );
});
