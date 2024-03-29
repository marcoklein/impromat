import { expect, Page } from "@playwright/test";

export class DevPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectToolbarTextToBe(text: string | RegExp) {
    await expect(this.page.getByRole("heading", { name: text })).toBeVisible();
  }

  async enableDebug() {
    await this.page.evaluate(() => {
      console.log("Setting DEBUG localStorage to impromat:*");
      window.localStorage.setItem("debug", "impromat:*");
    });
  }
}
