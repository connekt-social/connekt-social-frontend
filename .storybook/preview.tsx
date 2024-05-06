import { CssBaseline } from "@mui/material";
import React from "react";
import type { Preview } from "@storybook/react";
import MasterProvider from "../src/context/MasterProvider";
import { Settings } from "../src/context/SettingsContext";

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
    (Story, context) => {
      const mode = context.globals.theme;
      const settings: Settings = {
        mode,
      };
      return (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Manrope:wght@200..800&display=swap"
            rel="stylesheet"
          />
          <CssBaseline />
          <MasterProvider settings={settings}>
            <Story />
          </MasterProvider>
        </>
      );
    },
  ],
};

export default preview;
export const globalTypes = {
  theme: {
    name: "Theme",
    title: "Theme",
    description: "Theme for your components",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      dynamicTitle: true,
      items: [
        { value: "light", left: "☀️", title: "Light mode" },
        { value: "dark", left: "🌙", title: "Dark mode" },
      ],
    },
  },
};
