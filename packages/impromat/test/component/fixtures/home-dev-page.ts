import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";

export class HomeDevPage extends DevPage {
  homePageTitleLocator: Locator;
  homePageTabLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.homePageTitleLocator = page.getByText(/impromat\.app/);
    this.homePageTabLocator = page.getByLabel("home");
  }

  async goto() {
    await this.page.goto(`/nav/home`);
  }
}
