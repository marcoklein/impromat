import { Locator, Page, expect } from "@playwright/test";
import { DevPage } from "./dev-page";
import { WorkshopsDevPage } from "./workshops-dev-page";

export class WorkshopDevPage extends DevPage {
  readonly optionsLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.optionsLocator = page
      .locator('ion-button:has-text("Ellipsis Vertical")')
      .getByRole("button");
  }

  async createNew(name: string) {
    return new WorkshopsDevPage(this.page).addWorkshop(name);
  }

  async goto(workshopId: string) {
    await this.page.goto(`./workshop/${workshopId}`);
  }

  async createAndGoto(name: string = "Test Workshop") {
    const workshopId = await this.createNew(name);
    await this.goto(workshopId);
    return workshopId;
  }

  async rename(newName: string = "Renamed Workshop") {
    const url = this.page.url();
    const page = this.page;
    await page
      .locator('ion-button:has-text("Ellipsis Vertical")')
      .getByRole("button")
      .click();
    await expect(page).toHaveURL(`${url}?dialog`);
    await page.getByRole("button", { name: "Pencil Rename" }).click();
    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill(newName);
    await page.getByRole("button", { name: "Save" }).click();
  }
}
