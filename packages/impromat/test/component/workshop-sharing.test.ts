import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

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

  pageTest(
    "should allow public access on shared workshop",
    async ({ page, auth, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto("shared workshop");
      await workshopPage.share();
      const workshopUrl = page.url();
      // when
      await page.context().clearCookies();
      await page.reload();
      await page.goto(workshopUrl);
      // then
      await workshopPage.expectToolbarTextToBe("Workshop (View)");
      await expect(workshopPage.addFabButtonToggleLocator).toBeHidden();
      await expect(workshopPage.addFirstElementLocator).toBeHidden();
    },
  );
});
