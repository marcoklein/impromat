import { expect, test } from "@playwright/experimental-ct-react";
import { makeFragmentData } from "../../../graphql-client";
import { WorkshopElementItemComponent_WorkshopElementFragmentDoc } from "../../../graphql-client/graphql";
import { WorkshopElementItem } from "./WorkshopElementItem";

test.describe("ShareWorkshopModal", () => {
  // given
  const workshopFragment = makeFragmentData(
    {
      id: "workshop-element-id",
      note: "This is a note",
      basedOn: {
        id: "based-on-id",
        name: "Based On Name",
        markdown:
          "## Based On Markdown\nWith some content\n\n- list item 1\n- list item 2",
      },
      section: {
        id: "section-id",
        workshop: {
          id: "workshop-id",
          canEdit: true,
        },
      },
    },
    WorkshopElementItemComponent_WorkshopElementFragmentDoc,
  );

  test("should have expected screenshot", async ({ mount }) => {
    // given
    // when
    const component = await mount(
      <WorkshopElementItem
        workshopElementFragment={workshopFragment}
        routerLink={"/test-link"}
        onRemoveClick={function () {}}
      ></WorkshopElementItem>,
    );
    // then
    await expect(component).toHaveScreenshot();
  });
});
