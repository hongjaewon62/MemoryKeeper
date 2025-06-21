import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../src/style/GlobalStyle.jsx";
import Header from "./header/header.jsx";
import Home from "./main/home.jsx";
import Login from "./Login/Login.jsx";
import SignUp from "./login/SignUp.jsx";
import DementiaInformation from "./information/DementiaInformation.jsx";
import Statistics from "./information/Statistics.jsx"
import Center from "./center/center.jsx";
import BorderList from "./border/BorderList.jsx";
import BorderWrite from "./border/BroderWrite.jsx";
import BorderDetail from "./border/BorderDetail.jsx";
import MusicListen from "./music/musicListen.jsx";
import AddMusic from "./music/AddMusic.jsx";
import MemoryGame from "./game/MemoryGame.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route index element={<Home />}/>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/information" element={<DementiaInformation />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/center" element={<Center />} />
                    <Route path="/borderList" element={<BorderList />} />
                    <Route path="/borderEdit/:id" element={<BorderWrite />} />
                    <Route path="/musicListen" element={<MusicListen />} />
                    <Route path="/memoryGame" element={<MemoryGame />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/borderWrite" element={<BorderWrite />} />
                        <Route path="/borderDetail/:id" element={<BorderDetail />} />
                        <Route path="/addMusic" element={<AddMusic />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
