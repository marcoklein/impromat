import { expect, Page } from "@playwright/test";

export class DevPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectToolbarTextToBe(text: string | RegExp) {
    await expect(
      this.page.locator(`ion-toolbar ion-title`).getByText(text),
    ).toBeVisible();
  }
}
