import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { InfoPopper } from "./InfoPopper";
import { Construction } from "@mui/icons-material";
import React from "react";

const meta: Meta<typeof InfoPopper> = {
  component: InfoPopper,
  args: {
    message: "This is a message",
    iconElement: undefined,
  },
  tags: ["autodocs"],
  argTypes: {
    iconElement: {
      control: {
        disable: true,
      },
    },
    message: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InfoPopper>;

export const OpenedInfoPopper: Story = {
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const body = canvasElement.ownerDocument.body;

    step("Click on the info icon", async () => {
      canvas.getByLabelText("info").click();
    });

    step("Check if the message is displayed", async () => {
      await expect(
        await within(body).findByText(args.message as string),
      ).toBeInTheDocument();
    });
  },
};

export const WithCustomIcon = () => (
  <InfoPopper message="This is a message" iconElement={<Construction />} />
);
