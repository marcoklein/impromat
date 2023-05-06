import { DevPage } from "./dev-page.js";

export class FavoriteElementsDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./library/favorites`);
  }
}
