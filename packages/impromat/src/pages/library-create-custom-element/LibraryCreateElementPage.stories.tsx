import { jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "urql";
import { fromValue } from "wonka";
import { LibraryCreateElementPage_QueryQuery } from "../../graphql-client/graphql";
import { LibraryCreateElementPage } from "./LibraryCreateElementPage";

const meta: Meta<typeof LibraryCreateElementPage> = {
  component: LibraryCreateElementPage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LibraryCreateElementPage>;

export const Default: Story = {
  render: () => {
    const mockResponse: LibraryCreateElementPage_QueryQuery = {
      tags: [
        {
          id: "1",
          name: "Tag 1",
        },
      ],
    };
    const mockClient = {
      executeQuery: () => {
        return fromValue({
          data: mockResponse,
        });
      },
      executeMutation: jest.fn(),
    };
    return (
      <Provider value={mockClient}>
        <LibraryCreateElementPage />
      </Provider>
    );
  },
};
