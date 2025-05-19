import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import InputUI from "../ui/InputUI";
import Button from "../ui/Button";
import { useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: #B4E4FF;
    width: clamp(20vh, 60vh, 80vh);
    height: clamp(15vh, 50vh, 80vh);
    max-width: 80vw;
    max-height: 90vw;  
`

const LoginText = styled.div`
    font-size: clamp(20px, 2.5vw, 50px);
    margin-top: clamp(20px, 50px, 100px);
    margin-bottom: clamp(10px, 20px, 40px);
`

const CheckBoxDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    justify-content: flex-start;
    margin-bottom: 25px;
`

const CheckBoxText = styled.span`
    font-size: clamp(12px, 1vw, 35px);;
`

function Login () {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", null, {
                params: {
                    username: id,
                    password: password
                }
            });

            navigate("/home");
        } catch(error) {
            alert("로그인 실패");
        }
    };

    return (
        <Wrapper>
            <LoginText>로그인</LoginText>
            <LoginWrapper>
                <InputUI
                    type="text"
                    placeholder="아이디를 입력하세요"
                    $width={"80%"}
                    $height={"10%"}
                    $margin={"0 0 25px 0"}
                    $icon={"img/user.png"}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <InputUI
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    $width={"80%"}
                    $height={"10%"}
                    $margin={"0 0 25px 0"}
                    $icon={"img/password.png"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <CheckBoxDiv>
                    <InputUI type="checkbox" $width={"25px"} $height={"25px"} />
                    <CheckBoxText>아이디 저장</CheckBoxText>
                </CheckBoxDiv>
                <Button title={"로그인"} $width={"80%"} $height={"10%"} $margin={"0 0 25px 0"} onClick={handleLogin}/>
                <Button title={"회원가입"} $width={"80%"} $height={"10%"} $margin={"0 0 25px 0"} onClick={() => {
                    navigate("/signUp")
                }} />
            </LoginWrapper>
        </Wrapper>
    )
}

export default Login;