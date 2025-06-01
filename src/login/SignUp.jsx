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

function SignUp () {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async () => {
        if(password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const userData = {
                username: username,
                email: email,
                password: password
            };

            const response = await axios.post("/api/users/signUp", userData);

            navigate("/login");
        } catch (error) {
            alert("회원가입 실패: " + error.response.data);
        }
    }
    return (
        <Wrapper>
            <LoginText>회원가입</LoginText>
            <LoginWrapper>
                <InputUI
                    type="text"
                    placeholder="아이디를 입력하세요"
                    $width={"80%"}
                    $height={"10%"}
                    $margin={"0 0 25px 0"}
                    $icon={"img/user.png"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputUI
                    type="email"
                    placeholder="이메일을 입력하세요"
                    $width={"80%"}
                    $height={"10%"}
                    $margin={"0 0 25px 0"}
                    $icon={"img/mail.png"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputUI
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    $width={"80%"} $height={"10%"}
                    $margin={"0 0 25px 0"}
                    $icon={"img/password.png"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputUI
                    type="password"
                    placeholder="비밀번호를 한번 더 입력하세요"
                    $width={"80%"} $height={"10%"}
                    $margin={"0 0 25px 0"}
                    $icon={"img/confirmation.png"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button title={"회원가입"} $width={"80%"} $height={"10%"} $margin={"0 0 25px 0"} onClick={handleSignUp}/>
            </LoginWrapper>
        </Wrapper>
    )
}

export default SignUp;