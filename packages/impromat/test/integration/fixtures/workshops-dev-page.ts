import { expect } from "@playwright/test";
import { DevPage } from "./dev-page";

export class WorkshopsDevPage extends DevPage {
  async addWorkshop(name: string = "Test Workshop") {
    const page = this.page;
    await page.goto("./workshop");
    await page.locator("text=AddAdd Workshop >> button").click();
    await expect(page).toHaveURL("./workshop?dialog");
    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill(name);
    await page.locator('button:has-text("Save")').click();
    await page.waitForSelector(`text="${name}"`);
    const workshopId = /[^/]*?$/.exec(page.url())![0];
    await expect(page).toHaveURL(`./workshop/${workshopId}`);
    return workshopId;
  }

  async goto() {
    await this.page.goto("https://playwright.dev");
  }
}
