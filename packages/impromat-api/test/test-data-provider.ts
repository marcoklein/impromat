import { Workshop } from "../src/graphql/schema.gen";

export const TEST_DATA = {
  simpleWorkshop: (): Workshop => ({
    id: "1",
    name: "workshop",
    version: 0,
    description: "description",
    sections: [
      {
        id: "section-id",
        name: "section-name",
        version: 0,
        elements: [
          {
            id: "element-id",
            version: 0,
            markdown: "test markdown",
            name: "test element",
            note: "",
            tags: ["tag1", "tag2"],
          },
          {
            id: "second-element-id",
            version: 0,
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
