import { Box } from "@mui/material";
import { jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { DocumentNode } from "graphql";
import { MemoryRouter } from "react-router";
import { Provider } from "urql";
import { fromValue } from "wonka";
import {
  IsLoggedIn_QueryDocument,
  IsLoggedIn_QueryQuery,
  WorkshopsPage_QueryDocument,
  WorkshopsPage_QueryQuery,
} from "../../graphql-client/graphql";
import { UnmaskedDocument } from "../../graphql-client/unmasked-document";
import { WorkshopsPage } from "./WorkshopsPage";

const meta: Meta<typeof WorkshopsPage> = {
  component: WorkshopsPage,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Box height={200}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof WorkshopsPage>;

const IsLoggedInResponseMock: UnmaskedDocument<IsLoggedIn_QueryQuery> = {
  me: {
    id: "4712",
  },
};

const WorkshopResponseMock: UnmaskedDocument<WorkshopsPage_QueryQuery> = {
  searchWorkshops: [
    {
      workshop: {
        createdAt: "2021-10-01T00:00:00Z",
        id: "1",
        name: "Test Workshop",
        updatedAt: "2021-10-01T00:00:00Z",
        isListed: true,
        sections: [],
        version: 1,
        owner: {
          id: "4712",
          name: "Test User",
        },
      },
    },
  ],
};

export const Default: Story = {
  render: () => {
    const mockClient = {
      executeQuery: ({ query }: { query: DocumentNode }) => {
        if (query === IsLoggedIn_QueryDocument) {
          return fromValue({
            data: IsLoggedInResponseMock,
          });
        }
        if (query === WorkshopsPage_QueryDocument) {
          return fromValue({
            data: WorkshopResponseMock,
          });
        }
      },
      executeMutation: jest.fn(),
    };
    return (
      <MemoryRouter>
        <Provider value={mockClient}>
          <WorkshopsPage />
        </Provider>
      </MemoryRouter>
    );
  },
};
