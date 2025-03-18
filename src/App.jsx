import { useState } from "react"
import styled, {createGlobalStyle } from "styled-components"
import GlobalStyle from "../src/style/GlobalStyle.jsx";
import Header from "./header/header.jsx";

function App() {
  return (
    <>
    <title>기억지킴이</title>
      <GlobalStyle />
      <Header />
    </>
  )
}

export default App
