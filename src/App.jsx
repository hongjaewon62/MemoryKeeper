import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../src/style/GlobalStyle.jsx";
import Header from "./header/header.jsx";
import Home from "./main/home.jsx";
import Login from "./Login/Login.jsx";
import SignUp from "./login/SignUp.jsx";
import Statistics from "./information/Statistics.jsx"
import Center from "./center/center.jsx";
import BorderList from "./border/BorderList.jsx";
import BorderWrite from "./border/BroderWrite.jsx";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route index element={<Home />}/>
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="center" element={<Center />} />
        <Route path="borderList" element={<BorderList />} />
        <Route path="borderWrite" element={<BorderWrite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
