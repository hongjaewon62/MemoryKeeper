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
import BorderDetail from "./border/BorderDetail.jsx";

import SecondHeader from "./secondhand/SecondHeader.jsx";
import SecondHome from "./secondhand/SecondHome.jsx";
import SecondLogin from "./secondhand/SecondLogin.jsx";
import SecondSignUp from "./secondhand/SecondSignUp.jsx";
import SecondBorderWrite from "./secondhand/SecondBorderWrite.jsx";
import SecondBorderDetail from "./secondhand/SecondBorderDetail.jsx";

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
        <Route path="borderDetail/:id" element={<BorderDetail />} />
        <Route path="/borderEdit/:id" element={<BorderWrite />} />
      </Routes>
    </BrowserRouter>
  )

  // return (
  //   <BrowserRouter basename={import.meta.env.BASE_URL}>
  //     {/* <GlobalStyle /> */}
  //     <SecondHeader />
  //     <Routes>
  //       <Route index element={<SecondHome />}/>
  //       <Route path="home" element={<SecondHome />} />
  //       <Route path="login" element={<SecondLogin />} />
  //       <Route path="signUp" element={<SecondSignUp />} />
  //       <Route path="borderWrite" element={<SecondBorderWrite />} />
  //       <Route path="borderDetail/:id" element={<SecondBorderDetail />} />
  //       <Route path="/borderEdit/:id" element={<SecondBorderWrite />} />
  //     </Routes>
  //   </BrowserRouter>
  // )
}

export default App
