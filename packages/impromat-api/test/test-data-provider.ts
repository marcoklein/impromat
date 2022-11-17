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
            name: "element",
            note: "",
            tags: ["tag1", "tag2"],
          },
        ],
      },
    ],
    updatedAt: 0,
    deleted: false,
  }),
};
