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
});
