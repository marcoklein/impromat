import { DevPage } from "./dev-page";

export class LibraryDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./library`);
  }

  async searchForElement(searchText: string) {
    const page = this.page;
    await page.getByPlaceholder("Search").click();
    await page.getByPlaceholder("Search").fill(searchText);
  }

  async gotoElementFromSearch() {
    const page = this.page;
    const searchText = "freeze";
    await this.searchForElement(searchText);
    await page.getByText("Freeze").first().click();
  }

  searchTabLocator() {
    return this.page.getByText("SearchExplore");
  }

  libraryTabLocator() {
    return this.page.getByText("BrushMy Library");
  }

  tabLocator(name: string | RegExp) {
    return this.page.getByRole("contentinfo").getByText(name);
  }

  async createCustomElement(
    name: string = "test custom element",
    options?: { isPublic: boolean },
  ) {
    const page = this.page;
    await this.fillCustomElementPage({
      name,
      isPublic: options?.isPublic ?? false,
    });

    await page.getByRole("button", { name: "Create Element" }).click();
  }

  async createCustomElementAndAddToWorkshop(
    name: string,
    options?: { isPublic?: boolean },
  ) {
    await this.fillCustomElementPage({
      name,
      isPublic: options?.isPublic ?? false,
    });

    await this.page
      .getByRole("button", { name: "Create and Add to Workshop" })
      .click();
  }

  private async fillCustomElementPage(options: {
    name: string;
    isPublic: boolean;
  }) {
    const libraryPage = this;
    const page = this.page;
    await libraryPage.libraryTabLocator().click();
    await page.locator("ion-fab-button").click();
    await page.getByRole("textbox", { name: "Name" }).fill(options.name);

    if (options.isPublic) {
      await page
        .getByRole("checkbox", {
          name: "Share Element with Community",
          exact: true,
        })
        .getByText(
          "Share Element with CommunityContribute to the Impromat community with your indiv",
        )
        .click();
    }
  }
}
