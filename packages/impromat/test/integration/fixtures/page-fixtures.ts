import { test as base } from "@playwright/test";
import { WorkshopDevPage } from "./workshop-dev-page";
import { WorkshopElementDevPage } from "./workshop-element-dev-page";
import { WorkshopsDevPage } from "./workshops-dev-page";

type PageFixtures = {
  workshopPage: WorkshopDevPage;
  workshopsPage: WorkshopsDevPage;
  workshopElementPage: WorkshopElementDevPage;
};

const test = base.extend<PageFixtures>({
  workshopPage: async ({ page }, use) => {
    await use(new WorkshopDevPage(page));
  },
  workshopsPage: async ({ page }, use) => {
    await use(new WorkshopsDevPage(page));
  },
  workshopElementPage: async ({ page }, use) => {
    await use(new WorkshopElementDevPage(page));
  },
});

export { test as pageTest };
