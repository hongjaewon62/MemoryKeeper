import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../src/style/GlobalStyle.jsx";
import Header from "./header/header.jsx";
import Home from "./main/home.jsx";
import Login from "./Login/Login.jsx";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route index element={<Home />}/>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
