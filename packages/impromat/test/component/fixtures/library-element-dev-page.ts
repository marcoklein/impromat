import { DevPage } from "./dev-page";

export class LibraryElementDevPage extends DevPage {
  async addToFavoriteElements() {
    const page = this.page;
    await page.getByRole("button", { name: "Add to favorites." }).click();
  }

  async removeFromFavoriteElements() {
    const page = this.page;
    await page.getByRole("button", { name: "Remove from favorites." }).click();
  }
}
