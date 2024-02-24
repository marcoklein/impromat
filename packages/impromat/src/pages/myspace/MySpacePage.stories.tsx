import { expect, jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { MemoryRouter } from "react-router";
import { Provider } from "urql";
import { fromValue } from "wonka";
import { MySpacePage_QueryQuery } from "../../graphql-client/graphql";
import { MySpacePage } from "./MySpacePage";

const meta: Meta<typeof MySpacePage> = {
  component: MySpacePage,
};

export default meta;

type Story = StoryObj<typeof MySpacePage>;

const MockResponse: MySpacePage_QueryQuery = {
  me: {
    id: "1",
    name: "Test User",
    languageCodes: ["en"],
  },
};

export const Default: Story = {
  render: () => {
    const mockClient = {
      executeQuery: () => {
        return fromValue({
          data: MockResponse,
        });
      },
      executeMutation: jest.fn(),
    };
    return (
      <MemoryRouter>
        <Provider value={mockClient}>
          <MySpacePage />
        </Provider>
      </MemoryRouter>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("link", { name: /my elements/i })).toHaveAttribute(
      "href",
      "/nav/elements",
    );
  },
};
