import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root[data-color-mode='light'] {
    --text: #000;
    --background0: #F8F9FA;
    --background1: #F1F3F5;
    --background2: #E9ECEF;
    --background3: #DEE2E6;
    --hover-layer: rgba(0, 0, 0, 0.1);
  }

  :root[data-color-mode='dark'] {
    --text: #fff;
    --background0: #121212;
    --background1: #1E1E1E;
    --background2: #252525;
    --background3: #2E2E2E;
    --hover-layer: rgba(255, 255, 255, 0.1);
  }

  html {
    color: var(--text);
    background-color: var(--background0);
  }

`;


export default GlobalStyle;
