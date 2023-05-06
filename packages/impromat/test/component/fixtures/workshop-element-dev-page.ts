import { DevPage } from "./dev-page.js";
import { WorkshopDevPage } from "./workshop-dev-page.js";

export class WorkshopElementDevPage extends DevPage {
  async createAndGoto() {
    const page = this.page;
    const workshopPage = new WorkshopDevPage(page);
    await workshopPage.createAndGoto();
    await workshopPage.addElementFromSearch();
    await workshopPage.elementSelector.click();
  }
}
