import { DevPage } from "./dev-page.js";
import { FavoriteElementsDevPage } from "./favorite-elements-dev-page.js";

const NOT_LIBRARY_CUSTOM_ELEMENT_URL_REGEX =
  /^((?!library-add-custom-element).)*$/;

export class LibraryDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./library`);
  }

  async searchForElement(searchText: string) {
    const page = this.page;
    await page.getByPlaceholder("Search").click();
    await page.getByPlaceholder("Search").fill(searchText);
    await page.getByText(new RegExp(searchText, "i")).first().waitFor();
  }

  async gotoFirstElementFromSearch() {
    const searchText = "freeze";
    await this.searchForElement(searchText);
    await this.openElementCard();
  }

  async openElementCard(name?: string) {
    const page = this.page;
    if (name) {
      await page
        .locator("ion-card", {
          hasText: name,
        })
        .getByRole("link", { name: "Open" })
        .click();
    } else {
      await page.getByRole("link", { name: "Open" }).first().click();
    }
  }

  async gotoSearch() {
    await this.page.goto("./library/search");
  }

  async gotoFavorites() {
    await new FavoriteElementsDevPage(this.page).goto();
  }

  searchTabLocator() {
    return this.page.getByText("SearchExplore");
  }

  libraryTabLocator() {
    return this.page.getByText("BrushMy Library");
  }

  tabLocator(name: string | RegExp) {
    return this.page.getByRole("contentinfo").getByText(name).first();
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
    await page.waitForURL(NOT_LIBRARY_CUSTOM_ELEMENT_URL_REGEX);
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
    await page.locator("ion-fab-button").last().click();
    await page.getByRole("textbox", { name: "Name" }).fill(options.name);

    if (options.isPublic) {
      await page
        .getByRole("checkbox", {
          name: "Add to Public Impromat Elements",
          exact: true,
        })
        .getByText("Contribute your element to the public Impromat community.")
        .click();
    }
  }
}
