import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        background: linear-gradient(#FFFFFF, #DDF0FF);
        min-height: 100vh;
        margin: 0;
        padding: 0;
        overflow-y: scroll;     // 스크롤바 활성화
    }

    .ql-align-center { text-align: center; }
    .ql-align-right { text-align: right; }
    .ql-align-left { text-align: left; }
`

export default GlobalStyle;