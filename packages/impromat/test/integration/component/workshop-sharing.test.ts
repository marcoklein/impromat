import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "../fixtures/page-fixtures.js";

pageTest.describe.configure({ mode: "parallel" });

pageTest.describe("Workshop Sharing", () => {
  pageTest(
    "given shared workshop and other user",
    async ({ auth, workshopPage, workshopsPage, page, accountPage }) => {
      // given
      let uniqueWorkshopName = `shared workshop ${randomUUID()}`;
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      await workshopPage.createAndGoto(uniqueWorkshopName);
      await workshopPage.shareViaLink();
      const workshopUrl = page.url();
      await accountPage.goto();
      await accountPage.logout();

      await pageTest.step(
        "should copy shared workshop url to clipboard",
        async () => {
          // when
          const clipboardText = await page.evaluate(
            "navigator.clipboard.readText()",
          );
          // then
          expect(clipboardText).toBe(workshopUrl);
        },
      );

      await pageTest.step(
        "should allow access on shared workshop for other logged in user",
        async () => {
          // when
          await auth.loginAsRandomUser();
          await page.goto(workshopUrl);
          // then
          await expect(workshopPage.addSectionButtonLocator).toBeHidden();
          await expect(workshopPage.addElementButtonLocator).toBeHidden();
          await expect(workshopPage.addFirstElementLocator).toBeHidden();
        },
      );
    },
  );

  pageTest(
    "given shared workshop and public user",
    async ({
      auth,
      workshopPage,
      workshopsPage,
      page,
      accountPage,
      libraryPage,
      libraryElementPage,
      workshopElementPage,
    }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      const workshopName = `${randomUUID()}`;
      await workshopPage.createAndGoto(workshopName);
      await workshopPage.addSection("first-section");
      await workshopPage.openLibraryToAddNewElement();
      await libraryPage.searchForElement("Freeze");
      await libraryPage.openElementCard("Freeze");
      await libraryElementPage.addToWorkshop(workshopName);
      await workshopPage.closeSection("first-section");
      await workshopPage.shareWithCommunity();
      const workshopUrl = page.url();
      await accountPage.goto();
      await accountPage.logout();

      await pageTest.step(
        "should show workshop in workshop section to public user",
        async () => {
          // when
          await workshopsPage.goto();
          // then
          await expect(page.getByText(workshopName)).toBeVisible();
        },
      );

      await pageTest.step(
        "should allow public access on shared workshop",
        async () => {
          // when
          await page.goto(workshopUrl);
          // then
        },
      );

      await pageTest.step("should have all sections opened", async () => {
        // then
        await expect(workshopPage.addSectionButtonLocator).toBeHidden();
        await expect(workshopPage.addElementButtonLocator).toBeHidden();
        await expect(workshopPage.addFirstElementLocator).toBeHidden();
      });

      await pageTest.step(
        "should allow access on improbib element to public user",
        async () => {
          await page.goto(workshopUrl);
          // when
          await workshopPage.getElementByNameLocator("Freeze").click();
          // then
          await workshopPage.expectToolbarTextToBe("Freeze");
          await expect(workshopElementPage.addNoteLocator).toBeHidden();
        },
      );
    },
  );
});
