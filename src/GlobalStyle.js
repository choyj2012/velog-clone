import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root[data-color-mode='light'] {
    --text: #000;
    --reverse: #fff;
    --background0: #F8F9FA;
    --background1: #F1F3F5;
    --background2: #E9ECEF;
    --background3: #DEE2E6;
  }

  :root[data-color-mode='dark'] {
    --text: #fff;
    --reverse: #000;
    --background0: #121212;
    --background1: #1E1E1E;
    --background2: #252525;
    --background3: #2E2E2E;
  }

  html {
    color: var(--text);
    background-color: var(--background0);
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  }

`;


export default GlobalStyle;
