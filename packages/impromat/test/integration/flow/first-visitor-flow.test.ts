import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "../fixtures/page-fixtures.js";

pageTest.describe(
  "Feature: First Time Visitors",
  {
    annotation: {
      type: "feature",
      description:
        "First time visitors can open workshops, elements and are redirected to the login page when they want to create a workshop.",
    },
  },
  () => {
    pageTest(
      "Scenario: Visitor lands on workshops page",
      async ({
        page,
        auth,
        workshopsPage,
        workshopPage,
        libraryPage,
        accountPage,
        libraryElementPage,
      }) => {
        const communityWorkshopName = "community workshop";
        const communityElementName = "community element";

        await pageTest.step(
          "Background: Community workshop is existing",
          async () => {
            // given
            await auth.loginAsRandomUser();
            await libraryPage.goto();
            await libraryPage.createCustomElement(communityElementName, {
              isPublic: true,
            });
            await workshopsPage.goto();
            await workshopPage.createAndGoto(communityWorkshopName);
            await workshopPage.addSection("first-section");
            await workshopPage.openLibraryToAddNewElement();
            await libraryPage.searchForElement("Freeze");
            await libraryPage.openElementCard("Freeze");
            await libraryElementPage.addToWorkshop(communityWorkshopName);
            await workshopPage.closeSection("first-section");
            await workshopPage.shareWithCommunity();
            await accountPage.goto();
            await accountPage.logout();
          },
        );

        await pageTest.step(
          "User opens Impromat and sees public workshop",
          async () => {
            // given
            await page.goto("/");
            // when
            await workshopsPage
              .getWorkshopWithNameLocator(communityWorkshopName)
              .first()
              .click();
            // then
            await expect(page).toHaveScreenshot();
          },
        );

        await pageTest.step(
          "User clicks like button and sees login dialog",
          async () => {
            // given
            // when
            await workshopPage.addToLikesButtonLocator.click();
            // then
            await expect(page).toHaveScreenshot();
          },
        );
      },
    );
  },
);
