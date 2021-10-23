import { createGlobalStyle } from "styled-components";

export const color = {
  white: "#FFF",
  whiteTransparent: "rgba(255, 255, 255, 0.7)",
  blue: "#225DCC",
  blueLight: "#2976ff",
  transparent: "transparent",
  red: "#FF9999",
};

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: monospace;
    margin: 0;
  }
`;
