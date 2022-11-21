// src/assets/styles/global-styles.ts
import { createGlobalStyle } from "styled-components";
// import { normalize } from "styled-normalize"; #브라우저마다 다르게 보이는 css 초기화

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`

  html,
  body {
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
// import { DefaultTheme } from "styled-components";

// export const lightTheme: DefaultTheme = {
//     mainColor: "#2A9C6B",
//     textColor: "#636e72",
//     weekColor: "#88CAAE",
//     accentColor: "#308153",
//     borderColor: "#EEEEEE",
//     dangerColor: "#E17055",
//     accentDangerColor: "#CB593D",
//     weekBorderColor: "#F6F6F6",
//   };