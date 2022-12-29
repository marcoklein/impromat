import { expect } from "@playwright/test";
import { DevPage } from "./dev-page";

export class WorkshopsDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./workshop`);
  }

  async addWorkshop(name: string = "Test Workshop") {
    const page = this.page;
    await this.goto();
    // press for first time
    // await page.locator("text=AddAdd Workshop >> button").click();
    await page.getByRole("button", { name: "Add" }).first().click();
    await expect(page).toHaveURL("./workshop?dialog");
    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill(name);
    await page.locator('button:has-text("Save")').click();
    await page.waitForSelector(`text="${name}"`);
    const workshopId = /[^/]*?$/.exec(page.url())![0];
    await expect(page).toHaveURL(`./workshop/${workshopId}`);
    return workshopId;
  }
}