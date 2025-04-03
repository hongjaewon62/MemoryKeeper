import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import InputUI from "../ui/InputUI";
import Button from "../ui/Button";

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

    return (
        <Wrapper>
            <LoginText>회원가입</LoginText>
            <LoginWrapper>
                <InputUI type="text" placeholder="아이디를 입력하세요" width={"80%"} height={"10%"} margin={"0 0 25px 0"} icon={"img/user.png"}/>
                <InputUI type="email" placeholder="이메일을 입력하세요" width={"80%"} height={"10%"} margin={"0 0 25px 0"} icon={"img/mail.png"}/>
                <InputUI type="password" placeholder="비밀번호를 입력하세요" width={"80%"} height={"10%"} margin={"0 0 25px 0"} icon={"img/password.png"}/>
                <InputUI type="password" placeholder="비밀번호를 한번 더 입력하세요" width={"80%"} height={"10%"} margin={"0 0 25px 0"} icon={"img/confirmation.png"}/>
                <Button title={"회원가입"} width={"80%"} height={"10%"} margin={"0 0 25px 0"} onClick={() => {
                    navigate("/login")
                }} />
            </LoginWrapper>
        </Wrapper>
    )
}

export default Login;