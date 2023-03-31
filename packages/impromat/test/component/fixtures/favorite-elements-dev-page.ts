import { DevPage } from "./dev-page";

export class FavoriteElementsDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./library/favorites`);
  }
}
