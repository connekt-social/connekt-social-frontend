import {
  createRequires,
  createUseRemoteComponent,
} from "@paciolan/remote-component";

import react from "react";
import runtime from "react/jsx-runtime";
import * as muiMaterial from "@mui/material";
import reactDom from "react-dom";
import axios from "axios";
import * as emotionReact from "@emotion/react";
import emotionStyled from "@emotion/styled";

const requires = createRequires(() => ({
  react,
  "@mui/material": muiMaterial,
  "react-dom": reactDom,
  axios,
  "@emotion/react": emotionReact,
  "@emotion/styled": emotionStyled,
  "react/jsx-runtime": runtime,
}));

export const useRemoteComponent = createUseRemoteComponent({ requires });
