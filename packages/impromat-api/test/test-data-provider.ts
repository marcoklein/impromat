import { Workshop } from "../src/graphql/schema.gen";

export const TEST_DATA = {
  simpleWorkshop: (): Workshop => ({
    id: "1",
    name: "workshop",
    description: "descriptiO",
    sections: [
      {
        id: "section-id",
        name: "section-name",
        elements: [
          {
            id: "element-id",
            markdown: "test markdown",
            name: "test element",
            note: "",
            tags: ["tag1", "tag2"],
          },
          {
            id: "second-element-id",
            markdown: "second test markdown",
            name: "second test element",
            note: "",
            tags: ["tag1", "tag2", "tag3"],
          },
        ],
      },
    ],
    updatedAt: 0,
    deleted: false,
  }),
};
