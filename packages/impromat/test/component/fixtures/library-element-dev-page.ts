import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";

export class LibraryElementDevPage extends DevPage {
  readonly addToLikesButtonLocator: Locator;
  readonly removeFromLikesButtonLocator: Locator;
  readonly backButtonLocator: Locator;
  readonly addToWorkshopButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.addToLikesButtonLocator = page.getByLabel("Add to likes.");
    this.removeFromLikesButtonLocator = page.getByLabel("Remove from likes.");
    this.backButtonLocator = page.getByLabel("Back");
    this.addToWorkshopButtonLocator = page.getByLabel("add", { exact: true });
  }

  async addToLikedElements() {
    await this.addToLikesButtonLocator.click();
    await this.removeFromLikesButtonLocator.waitFor();
  }

  async removeFromLikedElements() {
    await this.removeFromLikesButtonLocator.click();
    await this.addToLikesButtonLocator.waitFor();
  }

  async addToWorkshop(name: string) {
    const page = this.page;
    await this.addToWorkshopButtonLocator.click();
    await page.getByRole("button", { name }).click();
  }
}
