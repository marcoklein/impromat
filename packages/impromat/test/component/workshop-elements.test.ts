import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe.configure({ mode: "parallel" });

pageTest.describe("Workshop Elements Page", () => {
  pageTest(
    "should add an element from the search",
    async ({
      page,
      auth,
      workshopPage,
      workshopsPage,
      workshopElementPage,
      libraryElementPage,
      libraryPage,
    }) => {
      // given
      const workshopName = "test-workshop-name";
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      await workshopsPage.addWorkshop(workshopName);

      await pageTest.step("should add an element from search", async () => {
        // when
        await workshopPage.openLibraryToAddNewElement();
        await libraryPage.searchForElement("Freeze");
        await libraryPage.openElementCard("Freeze");
        await libraryElementPage.addToWorkshop(workshopName);
        // then
        await expect(
          workshopPage.getElementByNameLocator("Freeze"),
        ).toBeVisible();
      });

      await pageTest.step("should add a note to the element", async () => {
        // given
        const note = "my-test-note";
        // when
        await workshopPage.getElementByNameLocator("Freeze").click();
        await workshopElementPage.addNoteLocator.click();
        await page.getByPlaceholder("Add note").fill(note);
        await page.getByRole("button", { name: "Save" }).click();
        await workshopElementPage.backButtonLocator.click();
        // then
        await expect(page.getByText(note)).toBeVisible();
      });
    },
  );
});
