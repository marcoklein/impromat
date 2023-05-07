import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page";
import { LibraryDevPage } from "./library-dev-page";
import { WorkshopsDevPage } from "./workshops-dev-page";

export class WorkshopDevPage extends DevPage {
  readonly optionsLocator: Locator;
  readonly addFirstElementLocator: Locator;
  readonly elementSelector: Locator;
  readonly addFabButtonToggleLocator: Locator;
  readonly addElementButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.optionsLocator = page
      .locator('ion-button:has-text("Ellipsis Vertical")')
      .getByRole("button");
    this.addFirstElementLocator = page.getByRole("link", {
      name: "Add First Element",
    });
    this.elementSelector = page
      .getByRole("heading")
      .getByText("Freeze")
      .first();
    this.addFabButtonToggleLocator = page
      .getByRole("img")
      .filter({ hasText: "Add" })
      .locator("path");

    this.addElementButtonLocator = page
      .locator("ion-fab-list")
      .getByRole("link", { name: "Element" });
  }

  async createNew(name: string) {
    return await new WorkshopsDevPage(this.page).addWorkshop(name);
  }

  async goto(workshopId: string) {
    await this.page.goto(`./workshop/${workshopId}`);
  }

  async gotoElementFromSearch() {
    const page = this.page;
    await this.clickLocatorInFabMenu(this.addElementButtonLocator);
    await new LibraryDevPage(page).gotoFirstElementFromSearch();
  }

  async addElementFromSearch() {
    const page = this.page;
    await this.gotoElementFromSearch();
    await page
      .locator('ion-button:has-text("Add to Workshop")')
      .getByRole("button")
      .click();
  }

  async addSection(name: string) {
    const page = this.page;

    const addSectionLocator = page
      .locator("ion-fab-list")
      .getByRole("button", { name: "Section" });

    await this.clickLocatorInFabMenu(addSectionLocator);

    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill(name);
    await page.locator('button:has-text("Save")').click();
  }

  getSectionByNameLocator(name: string) {
    return this.page.getByText(name);
  }

  getElementByNameLocator(name: string) {
    return this.page.getByRole("heading", { name });
  }

  async createAndGoto(name: string = "Test Workshop") {
    const workshopId = await this.createNew(name);
    await this.goto(workshopId);
    return workshopId;
  }

  async share() {
    const page = this.page;
    await page.getByRole("button", { name: "Share" }).click();
    await page.locator("label").click();
    await page.getByRole("button", { name: "Copy workshop link" }).click();
  }

  async closeSection(name: string = "[Default Section]") {
    const page = this.page;
    await page
      .getByRole("listitem")
      .filter({ hasText: `${name}Chevron DownEllipsis` })
      .getByRole("button")
      .nth(1)
      .click();
    await page
      .getByRole("listitem")
      .filter({ hasText: `${name}Chevron UpEllipsis` })
      .waitFor();
  }

  async openLibrary() {
    const page = this.page;

    await this.clickLocatorInFabMenu(this.addElementButtonLocator);

    return new LibraryDevPage(page);
  }

  async rename(newName: string = "Renamed Workshop") {
    const page = this.page;
    await this.optionsLocator.click();
    await page.getByRole("button", { name: "Rename" }).click();
    await page.locator('input[type="text"]').fill(newName);
    await page.getByRole("button", { name: "Save" }).click();
  }

  protected async clickLocatorInFabMenu(locator: Locator) {
    try {
      await locator.click({ timeout: 1000 });
    } catch {
      await this.addFabButtonToggleLocator.click();
      await locator.click();
    }
  }
}
