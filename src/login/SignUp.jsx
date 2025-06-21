import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import InputUI from "../ui/InputUI";
import Button from "../ui/Button";
import { useRef, useState } from "react";
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

const ErrorWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
    width: 75%;
`

const ErrorMessage = styled.span`
    font-size: 0.8em;
    color: red;
`

function SignUp () {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [writeId, setWriteId] = useState(false);
    const [writeEmail, setWriteEmail] = useState(false);
    const [writePassword, setWritePassowrd] = useState(false);
    const [writeConfirmPassword, setWriteConfirmPassword] = useState(false);

    const idFocus = useRef(null);
    const emailFocus = useRef(null);
    const passwordFocus = useRef(null);
    const confirmPasswordFocus = useRef(null);

    const handleSignUp = async () => {
        let hasError = false;

        if(!id.trim()) {
            setWriteId(true);
            if (!hasError) {
                idFocus.current?.focus();
            }
            hasError = true;
        } else {
            setWriteId(false);
            hasError = false;
        }

        if(!email.trim()) {
            setWriteEmail(true);
            if (!hasError) {
                emailFocus.current?.focus();
            }
            hasError = true;
        } else {
            setWriteEmail(false);
            hasError = false;
        }

        if(!password.trim()) {
            setWritePassowrd(true);
            if (!hasError) {
                passwordFocus.current?.focus();
            }
            hasError = true;
        } else {
            setWritePassowrd(false);
            hasError = false;
        }

        if(!confirmPassword.trim()) {
            setWriteConfirmPassword(true);
            if (!hasError) {
                confirmPasswordFocus.current?.focus();
            }
            hasError = true;
        } else {
            setWriteConfirmPassword(false);
            hasError = false;
        }

        if(hasError) {
            return;
        }

        if(password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            confirmPasswordFocus.current?.focus();
            return;
        }

        try {
            const userData = {
                username: id,
                email: email,
                password: password
            };

            const res = await axios.post("/api/users/signUp", userData);

            navigate("/login");
        } catch (error) {
            alert("회원가입 실패: " + error.res.data);
        }
    }
    return (
        <Wrapper>
            <LoginText>회원가입</LoginText>
            <LoginWrapper>
                <InputUI
                    type="text"
                    placeholder="아이디를 입력하세요"
                    $width="80%"
                    $height="10%"
                    $margin="0 0 0 0"
                    $icon="img/user.png"
                    ref={idFocus}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <ErrorWrapper $visible={writeId}>
                    <ErrorMessage>아이디를 입력하세요</ErrorMessage>
                </ErrorWrapper>
                <InputUI
                    type="email"
                    placeholder="이메일을 입력하세요"
                    $width="80%"
                    $height="10%"
                    $margin="10px 0 0 0"
                    $icon="img/mail.png"
                    ref={emailFocus}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <ErrorWrapper $visible={writeEmail}>
                    <ErrorMessage>이메일을 입력하세요</ErrorMessage>
                </ErrorWrapper>
                {/* <InputUI
                    type="text"
                    placeholder="인증번호를 입력하세요"
                    $width="80%"
                    $height="10%"
                    $margin="10px 0 0 0"
                    $icon="img/mail.png"
                />
                <ErrorWrapper $visible={writeEmail}>
                    <ErrorMessage>인증번호를 입력하세요</ErrorMessage>
                </ErrorWrapper> */}
                <InputUI
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    $width="80%"
                    $height="10%"
                    $margin="10px 0 0 0"
                    $icon="img/password.png"
                    ref={passwordFocus}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ErrorWrapper $visible={writePassword}>
                    <ErrorMessage>비밀번호를 입력하세요</ErrorMessage>
                </ErrorWrapper>
                <InputUI
                    type="password"
                    placeholder="비밀번호를 한번 더 입력하세요"
                    $width="80%"
                    $height="10%"
                    $margin="10px 0 0 0"
                    $icon="img/confirmation.png"
                    ref={confirmPasswordFocus}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <ErrorWrapper $visible={writeConfirmPassword || (confirmPassword && password !== confirmPassword)}>
                    <ErrorMessage>{writeConfirmPassword ? "비밀번호를 한번 더 입력하세요" : password !== confirmPassword ? "비밀번호가 일치하지 않습니다" : "비밀번호"}</ErrorMessage>
                </ErrorWrapper>
                <Button title="회원가입" $width="80%" $height="10%" $margin="10px 0 0 0" onClick={handleSignUp}/>
            </LoginWrapper>
        </Wrapper>
    )
}

export default SignUp;