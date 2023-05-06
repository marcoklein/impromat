import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";

export class LibraryElementDevPage extends DevPage {
  addToFavoritesButtonLocator: Locator;
  removeFromFavoritesButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.addToFavoritesButtonLocator = page.getByRole("button", {
      name: "Add to favorites.",
    });
    this.removeFromFavoritesButtonLocator = page.getByRole("button", {
      name: "Remove from favorites.",
    });
  }

  async addToFavoriteElements() {
    await this.addToFavoritesButtonLocator.click();
  }

  async removeFromFavoriteElements() {
    await this.removeFromFavoritesButtonLocator.click();
  }
}
