import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";

export class LibraryElementDevPage extends DevPage {
  readonly addToLikesButtonLocator: Locator;
  readonly removeFromLikesButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.addToLikesButtonLocator = page.getByRole("button", {
      name: "Add to likes.",
    });
    this.removeFromLikesButtonLocator = page.getByRole("button", {
      name: "Remove from likes.",
    });
  }

  async addToLikedElements() {
    await this.addToLikesButtonLocator.click();
    await this.removeFromLikesButtonLocator.waitFor();
  }

  async removeFromLikedElements() {
    await this.removeFromLikesButtonLocator.click();
    await this.addToLikesButtonLocator.waitFor();
  }

  async clickBackButton() {
    await this.page.getByRole("link", { name: "back" }).click();
  }
}
