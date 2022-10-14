import { expect, test } from "@playwright/test";
import { Element } from "../../src/store/schema.gen";
import { WorkshopHelper } from "../../src/store/workshop-helper";

test.describe("Workshop Helper", () => {
  test("should create a new workshop", () => {
    // given
    const workshopHelper = new WorkshopHelper();
    const name = "name";
    const description = "description";
    // when
    const workshop = workshopHelper.newWorkshop({
      name,
      description,
    });
    // then
    expect(workshop.name).toBe(name);
    expect(workshop.description).toBe(description);
  });

  test("should add a new element", () => {
    // given
    const workshopHelper = new WorkshopHelper();
    const workshop = workshopHelper.newWorkshop({
      name: "w",
      description: "d",
    });
    const element: Partial<Element> = {
      id: "element1",
    };
    // when
    workshopHelper.pushElement(workshop, element);
    // then
    expect(workshop.sections).toHaveLength(1);
    expect(workshop.sections[0].isVisible).toBe(false);
    expect(workshop.sections[0].color).toBe(undefined);
    expect(workshop.sections[0].elements).toHaveLength(1);
    expect(workshop.sections[0].elements[0].id).toBe("element1");
  });

  test("should add a section with two elements", () => {
    // given
    const workshopHelper = new WorkshopHelper();
    const workshop = workshopHelper.newWorkshop({});
    const sectionId = "testsection";
    const firstElementId = "firstelement";
    const secondElementId = "secondelement";
    // when
    workshopHelper.pushSection(workshop, { id: sectionId });
    workshopHelper.pushElements(workshop, [
      { id: firstElementId },
      { id: secondElementId },
    ]);
    // then
    expect(workshop.sections).toHaveLength(1);
    expect(workshop.sections[0].isVisible).toBe(true);
    expect(workshop.sections[0].color).toBe(undefined);
    expect(workshop.sections[0].elements).toHaveLength(2);
    expect(workshop.sections[0].elements[0].id).toBe("firstelement");
    expect(workshop.sections[0].elements[1].id).toBe("secondelement");
  });

  test("should flatten all sections", () => {
    // given
    const workshopHelper = new WorkshopHelper();
    const workshop = workshopHelper.newWorkshop({});
    workshopHelper.pushElements(workshop, [{ id: "e1" }, { id: "e2" }]);
    // when
    const flatList = workshopHelper.flattenSections(workshop);
    // then
    expect(flatList).toHaveLength(3);
    expect(flatList[0].type).toBe("section");
    expect(flatList[1].type).toBe("element");
    expect(flatList[1].data.id).toBe("e1");
    expect(flatList[2].type).toBe("element");
    expect(flatList[2].data.id).toBe("e2");
  });

  test("should reorder an element", () => {
    // given
    const workshopHelper = new WorkshopHelper();
    const workshop = workshopHelper.newWorkshop({});
    workshopHelper.pushElements(workshop, [{ id: "e1" }, { id: "e2" }]);
    workshopHelper.pushSection(workshop, { id: "section1" });
    // when
    workshopHelper.moveItemFromIndexToIndex(workshop, 0, 1);
    // then
    expect(workshop.sections[0].isVisible).toBe(false);
    expect(workshop.sections[0].elements[0].id).toBe("e2");
    expect(workshop.sections[1].id).toBe("section1");
    expect(workshop.sections[1].elements[0].id).toBe("e1");
  });

  test("should reorder a collapsed section", () => {
    // given
    const workshopHelper = new WorkshopHelper();
    const workshop = workshopHelper.newWorkshop({});
    workshopHelper.pushSection(workshop, {
      id: "collapsedsection",
      isCollapsed: true,
    });
    workshopHelper.pushElements(workshop, [{ id: "e1" }, { id: "e2" }]);
    workshopHelper.pushSection(workshop, { id: "section1" });
    // when
    workshopHelper.moveItemFromIndexToIndex(workshop, 0, 1);
    // then
    console.log(workshop.sections);
    expect(workshop.sections[0].id).toBe("section1");
    expect(workshop.sections[0].elements).toHaveLength(0);
    expect(workshop.sections[1].id).toBe("collapsedsection");
    expect(workshop.sections[1].elements[0].id).toBe("e1");
    expect(workshop.sections[1].elements[1].id).toBe("e2");
  });
});
