import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page";
import { WorkshopsDevPage } from "./workshops-dev-page";

export class WorkshopDevPage extends DevPage {
  readonly optionsLocator: Locator;
  readonly addFirstElementLocator: Locator;
  readonly elementSelector: Locator;

  constructor(page: Page) {
    super(page);
    this.optionsLocator = page
      .locator('ion-button:has-text("Ellipsis Vertical")')
      .getByRole("button");
    this.addFirstElementLocator = page.getByRole("link");
    this.elementSelector = page.locator('role=heading[name="Freeze Tag"]');
  }

  async createNew(name: string) {
    return await new WorkshopsDevPage(this.page).addWorkshop(name);
  }

  async goto(workshopId: string) {
    await this.page.goto(`./workshop/${workshopId}`);
  }

  async gotoElementFromSearch() {
    const page = this.page;
    const searchText = "freeze";
    await this.addFirstElementLocator.waitFor();
    await this.addFirstElementLocator.click();
    await page.getByPlaceholder("Search").click();
    await page.getByPlaceholder("Search").fill(searchText);
    await page.getByText("improwikiDEFreeze TagKettenspieleSwitches").click();
  }

  async addElementFromSearch() {
    const page = this.page;
    await this.gotoElementFromSearch();
    await page
      .locator('ion-button:has-text("Add to Workshop")')
      .getByRole("button")
      .click();
  }

  async createAndGoto(name: string = "Test Workshop") {
    const workshopId = await this.createNew(name);
    await this.goto(workshopId);
    return workshopId;
  }

  async openLibrary() {
    const page = this.page;

    const addElementLocator = page
      .locator("ion-fab-list")
      .getByRole("link", { name: "Element" });
    const addFabButtonToggleLocator = page
      .getByRole("img")
      .filter({ hasText: "Add" })
      .locator("path");

    try {
      await addElementLocator.click({ timeout: 1000 });
    } catch {
      await addFabButtonToggleLocator.click();
      await addElementLocator.click();
    }
  }

  async rename(newName: string = "Renamed Workshop") {
    const page = this.page;
    await this.optionsLocator.click();
    await page.getByRole("button", { name: "Pencil Rename" }).click();
    await page.locator('input[type="text"]').fill(newName);
    await page.getByRole("button", { name: "Save" }).click();
  }
}
