import type { Meta, StoryObj } from "@storybook/react";
import ContentCard from "./ContentCard";
import imageSrc from "../../../stories/assets/figma-plugin.png";
import { Grid } from "@mui/material";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/ContentCard",
  component: ContentCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  decorators: [
    (Story) => (
      <Grid container sx={{ bgcolor: "#dddddddd" }}>
        <Story />
      </Grid>
    ),
  ],
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    imageSrc,
    title: "Content Card",
    description: "This is a content card",
    updatedAt: "2022-02-02",
    createdAt: "2022-02-02",
    scheduleDate: "2022-02-02",
    size: "portrait",
    itemType: "Type",
    itemID: "1",
  },
};
