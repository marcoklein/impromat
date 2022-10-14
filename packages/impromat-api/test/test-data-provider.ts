import { Workshop } from "../src/graphql/schema.gen";

export const TEST_DATA = {
  simpleWorkshop: (): Workshop => ({
    id: "1",
    name: "workshop",
    description: "descriptiO",
    elements: [],
    updatedAt: 0,
    deleted: false,
  }),
};
