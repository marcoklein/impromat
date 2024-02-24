import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "urql";
import { fromValue } from "wonka";
import { LibraryCreateElementPage } from "./LibraryCreateElementPage";

const meta: Meta<typeof LibraryCreateElementPage> = {
  component: LibraryCreateElementPage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LibraryCreateElementPage>;

export const Default: Story = {
  render: () => {
    const mockClient = {
      executeQuery: () => {
        return fromValue({
          data: {
            tags: [
              {
                id: "1",
                name: "Tag 1",
              },
            ],
          },
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
