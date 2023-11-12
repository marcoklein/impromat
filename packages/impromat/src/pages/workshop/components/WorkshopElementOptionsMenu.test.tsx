import { expect, test } from "@playwright/experimental-ct-react";
import { WorkshopElementOptionsMenu } from "./WorkshopElementOptionsMenu";

test.describe("WorkshopElementOptionsMenu", () => {
  test("should open remove confirmation", async ({ mount }) => {
    // given
    const component = await mount(
      <WorkshopElementOptionsMenu
        isOpen={true}
        setIsOpen={function (isOpen: boolean): void {
          throw new Error("Function not implemented.");
        }}
        onRemoveClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></WorkshopElementOptionsMenu>,
    );

    // when
    await component.getByRole("button").getByText("Remove").click();

    // then
    await expect(component.getByText("RemoveElement")).toBeVisible();
  });

  test("should trigger remove callback", async ({ mount }) => {
    // given
    let removeCalls = 0;
    const component = await mount(
      <WorkshopElementOptionsMenu
        isOpen={true}
        setIsOpen={function (isOpen: boolean): void {
          throw new Error("Function not implemented.");
        }}
        onRemoveClick={function (): void {
          removeCalls++;
        }}
      ></WorkshopElementOptionsMenu>,
    );

    // when
    await component.getByRole("button").getByText("Remove").click();
    await component.getByRole("button").getByText("Remove").last().click();

    // then
    expect(removeCalls).toBe(1);
  });
});
