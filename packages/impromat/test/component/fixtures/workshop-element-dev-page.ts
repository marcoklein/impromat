import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";
import { WorkshopDevPage } from "./workshop-dev-page.js";

export class WorkshopElementDevPage extends DevPage {
  addNoteLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.addNoteLocator = page.getByRole("button", { name: "Add Note" });
  }

  async createAndGoto() {
    const page = this.page;
    const workshopPage = new WorkshopDevPage(page);
    await workshopPage.createAndGoto();
    await workshopPage.addElementFromSearch();
    await page.waitForTimeout(1000); // TODO fixme: page seems to flash
    await workshopPage.elementSelector.click();
  }
}
