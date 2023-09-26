import { expect, test } from "@playwright/experimental-ct-react";
import { makeFragmentData } from "../../../graphql-client";
import { ShareWorkshopModal_WorkshopFragmentDoc } from "../../../graphql-client/graphql";
// import { HooksConfig } from "../../../test-hooks-config";
import { ShareWorkshopModal } from "./ShareWorkshopModal";

test.describe("ShareWorkshopModal", () => {
  // given
  const workshopFragment = makeFragmentData(
    {
      id: "workshop-id",
      isPublic: true,
      isListed: true,
    },
    ShareWorkshopModal_WorkshopFragmentDoc,
  );

  test("should close modal", async ({ mount }) => {
    // given
    // when
    const component = await mount(
      <ShareWorkshopModal
        isSharingModalOpen={false}
        setIsSharingModalOpen={undefined as any}
        workshopFragment={workshopFragment}
      ></ShareWorkshopModal>,
    );
    // then
    await expect(component.getByText("Share Workshop")).not.toBeVisible();
  });

  test("should render on small screen", async ({ mount }) => {
    // when
    const component = await mount(
      <ShareWorkshopModal
        isSharingModalOpen={true}
        setIsSharingModalOpen={undefined as any}
        workshopFragment={workshopFragment}
      ></ShareWorkshopModal>,
    );
    // then
    await expect(component).toHaveScreenshot();
  });

  test("should render on large screen", async ({ mount, page }) => {
    // given
    await page.setViewportSize({ width: 1920, height: 1080 });
    // when
    const component = await mount(
      <ShareWorkshopModal
        isSharingModalOpen={true}
        setIsSharingModalOpen={undefined as any}
        workshopFragment={workshopFragment}
      ></ShareWorkshopModal>,
    );
    // then
    await expect(component).toHaveScreenshot();
  });

  // TODO does not switch to IOS layout
  test.skip("should render with ios ui", async ({
    mount,
    browser,
    page,
    context,
    contextOptions,
  }) => {
    const iphone13 = {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      screen: {
        width: 390,
        height: 844,
      },
      viewport: {
        width: 390,
        height: 664,
      },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      defaultBrowserType: "webkit",
    };
    contextOptions = iphone13;
    await page.reload();
    // context = await browser.newContext(iphone13);

    // when
    const component = await mount(
      <ShareWorkshopModal
        isSharingModalOpen={true}
        setIsSharingModalOpen={undefined as any}
        workshopFragment={workshopFragment}
      ></ShareWorkshopModal>,
    );
    // then
    await expect(component).toHaveScreenshot();
  });
});
