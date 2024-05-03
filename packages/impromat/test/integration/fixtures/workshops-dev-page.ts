import { Locator, expect } from "@playwright/test";
import { DevPage } from "./dev-page.js";

export class WorkshopsDevPage extends DevPage {
  readonly workshopNameInputLocator: Locator;
  readonly workshopCreateButtonLocator: Locator;
  readonly newWorkshopButtonLocator: Locator;
  readonly url = "/nav/workshop";

  constructor(page: any) {
    super(page);
    this.workshopNameInputLocator = page.getByPlaceholder(
      /name for your workshop/i,
    );
    this.workshopCreateButtonLocator = page.getByRole("button", {
      name: "Create",
    });
    this.newWorkshopButtonLocator = page.getByLabel("New Workshop");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async addWorkshop(name: string = "Test Workshop") {
    const page = this.page;
    await this.newWorkshopButtonLocator.click();
    await this.workshopNameInputLocator.fill(name);
    await this.workshopCreateButtonLocator.click();
    await page.waitForSelector(`text="${name}"`);
    await page.waitForTimeout(1000);
    const workshopId = /[^/]*?$/.exec(page.url())![0];
    await expect(page).toHaveURL(`/workshop/${workshopId}`, {
      timeout: 5000,
    });
    return workshopId;
  }

  async expectToShowWorkshopWithName(name: string) {
    await expect(this.getWorkshopWithNameLocator(name)).toBeVisible();
  }

  getWorkshopWithNameLocator(name: string) {
    return this.page.getByRole("heading", { name });
  }
}
