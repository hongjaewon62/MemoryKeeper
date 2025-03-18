import { useState } from "react"
import styled, {createGlobalStyle } from "styled-components"
import GlobalStyle from "../src/style/GlobalStyle.jsx";
import Header from "./header/header.jsx";

const Wrapper = styled.div`
  background: linear-gradient(#FFFFFF, #DDF0FF);
  height: 100%;
  width: 100%;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
    </>
  )
}

export default App
