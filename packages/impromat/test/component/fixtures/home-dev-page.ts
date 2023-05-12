import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";

export class HomeDevPage extends DevPage {
  homePageTitleLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.homePageTitleLocator = page.getByText(/Welcome to impromat\.app/);
  }

  async goto() {
    await this.page.goto(`/`);
  }
}
