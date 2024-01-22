import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";

export class WorkshopElementDevPage extends DevPage {
  addNoteLocator: Locator;
  addToWorkshopLocator: Locator;
  readonly backButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.addNoteLocator = page.getByText("Add note");
    this.addToWorkshopLocator = page.getByLabel("add", { exact: true });
    this.backButtonLocator = page.getByLabel("Back");
  }

  async addToWorkshop(workshopName: string) {
    await this.addToWorkshopLocator.click();
    await this.page
      .getByRole("button", { name: workshopName, exact: true })
      .click();
  }
}
