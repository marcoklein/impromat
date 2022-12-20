import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Custom Elements", () => {
  pageTest("should create a custom element", async ({ page, libraryPage }) => {
    // given
    const name = "test-custom-element";
    // when
    await libraryPage.createCustomElement(name);
    // then
    await expect(page.getByText(new RegExp(name))).toBeVisible();
  });

  pageTest.describe("Workshop Context", () => {
    pageTest(
      "should create a custom element",
      async ({ page, workshopPage }) => {
        // given
        await workshopPage.createAndGoto();
        // when
        await workshopPage.addFirstElementLocator.click();
        await page.getByRole("tab", { name: "Brush Custom" }).click();
        await page
          .locator("ion-content")
          .filter({
            hasText:
              "AddCloseYour Individual ElementsYou cannot find the improv exercise or game that",
          })
          .locator("path")
          .nth(1)
          .click();
        await page.getByRole("textbox", { name: "Name" }).click();
        await page.getByRole("textbox", { name: "Name" }).fill("test-element");
        await page
          .getByRole("button", { name: "Create and Add to Workshop" })
          .click();
        await page.locator("ion-fab-button").click();
        await page.locator("ion-fab-list").click();
        await page.getByRole("tab", { name: "Brush Custom" }).click();
        await page.getByRole("listitem").getByText("test-element").click();
        await page.getByRole("button", { name: "Add to Workshop" }).click();
        // then
        expect(
          await page
            .locator("ion-router-outlet ion-item")
            .getByText("test-element")
            .count(),
        ).toBe(2);
      },
    );
  });
});
