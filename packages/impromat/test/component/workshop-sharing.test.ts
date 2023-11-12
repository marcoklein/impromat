import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe.configure({ mode: "parallel" });

pageTest.describe("Workshop Sharing", () => {
  pageTest(
    "should share a workshop and copy url to clipboard",
    async ({ page, auth, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto("shared workshop");
      // when
      await workshopPage.share();
      // then
      const clipboardText = await page.evaluate(
        "navigator.clipboard.readText()",
      );
      expect(clipboardText).toBe(page.url());
    },
  );

  pageTest.describe("with shared workshop", () => {
    let uniqueWorkshopName = `shared workshop ${randomUUID()}`;
    pageTest.beforeEach(async ({ auth, workshopPage }) => {
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto(uniqueWorkshopName);
      await workshopPage.share();
    });

    pageTest(
      "should allow public access on shared workshop",
      async ({ page, auth, workshopPage }) => {
        // given beforeEach
        const workshopUrl = page.url();
        // when
        await page.context().clearCookies();
        await page.reload();
        await page.goto(workshopUrl);
        // then
        await workshopPage.expectToolbarTextToBe("Workshop (View)");
        await expect(workshopPage.addSectionButtonLocator).toBeHidden();
        await expect(workshopPage.addElementButtonLocator).toBeHidden();
        await expect(workshopPage.addFirstElementLocator).toBeHidden();
      },
    );

    pageTest(
      "should allow access on shared workshop for other logged in user",
      async ({ page, auth, workshopPage }) => {
        // given beforeEach
        const workshopUrl = page.url();
        // when
        await auth.loginAsRandomUser();
        await page.goto(workshopUrl);
        // then
        await workshopPage.expectToolbarTextToBe("Workshop (View)");
        await expect(workshopPage.addSectionButtonLocator).toBeHidden();
        await expect(workshopPage.addElementButtonLocator).toBeHidden();
        await expect(workshopPage.addFirstElementLocator).toBeHidden();
      },
    );

    pageTest(
      "should allow public access on workshop element from improbib",
      async ({ page, auth, workshopPage }) => {
        // given beforeEach
        const workshopUrl = page.url();
        // when
        await auth.loginAsRandomUser();
        await page.goto(workshopUrl);
        // then
        await workshopPage.expectToolbarTextToBe("Workshop (View)");
        await expect(workshopPage.addSectionButtonLocator).toBeHidden();
        await expect(workshopPage.addElementButtonLocator).toBeHidden();
        await expect(workshopPage.addFirstElementLocator).toBeHidden();
      },
    );

    // community page is currently disabled
    pageTest.skip(
      "should list workshop and show in community page",
      async ({ auth, page, communityPage }) => {
        // given beforeEach
        await page
          .locator("ion-checkbox")
          .filter({ hasText: "Share with community" })
          .locator("label")
          .click();
        await page.waitForTimeout(500);
        // when
        await auth.loginAsRandomUser();
        await communityPage.goto();
        // then
        await expect(page.getByText(uniqueWorkshopName)).toBeVisible();
      },
    );
  });

  pageTest(
    "should have all sections opened",
    async ({ page, auth, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto("shared workshop");
      await workshopPage.addSection("first-section");
      await workshopPage.addElementFromSearch();
      await workshopPage.closeSection("first-section");
      await workshopPage.share();
      const workshopUrl = page.url();
      // when
      await page.context().clearCookies();
      await page.reload();
      await page.goto(workshopUrl);
      // then
      await workshopPage.expectToolbarTextToBe("Workshop (View)");
      await expect(workshopPage.addSectionButtonLocator).toBeHidden();
      await expect(workshopPage.addElementButtonLocator).toBeHidden();
      await expect(workshopPage.addFirstElementLocator).toBeHidden();
    },
  );

  pageTest(
    "should allow access on improbib element as public user",
    async ({ page, auth, workshopPage, workshopElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto("shared workshop");
      await workshopPage.addElementFromSearch();
      await workshopPage.share();
      const workshopUrl = page.url();
      await page.context().clearCookies();
      await page.reload();
      await page.goto(workshopUrl);
      // when
      await page.getByRole("heading", { name: "Freeze" }).click();
      await page.waitForURL(/\/workshop\/.*?\/part\/.*/);
      // then
      await workshopPage.expectToolbarTextToBe("Freeze");
      await expect(workshopElementPage.addNoteLocator).toBeHidden();
    },
  );
});
