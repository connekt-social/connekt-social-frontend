import { CssBaseline } from "@mui/material";
import React from "react";
import type { Preview } from "@storybook/react";
import { SettingsProvider } from "../src/context/SettingsContext";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <CssBaseline />
        <SettingsProvider>
          <Story />
        </SettingsProvider>
      </>
    ),
  ],
};

export default preview;
