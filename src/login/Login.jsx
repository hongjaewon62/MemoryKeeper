import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputUI from "../ui/InputUI";
import Button from "../ui/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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

const CheckBoxWrapper = styled.div`
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

const FincButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const FindButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline solid black;
    }
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

function Login () {
    const navigate = useNavigate();
    const {login} = useAuth();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [savedId, setSavedId] = useState(false);

    const [writeId, setWriteId] = useState(false);
    const [writePassword, setWritePassowrd] = useState(false);

    const idFocus = useRef(null);
    const passwordFocus = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem("savedId");
        if(saved) {
            setId(saved);
            setSavedId(true);
        }
    }, [])

    const handleLogin = async () => {
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

        if(hasError) {
            return;
        }

        try {
            const response = await axios.post("/api/users/login", null, {
                params: {
                    username: id,
                    password: password
                }
            });
            // localStorage.setItem("user", JSON.stringify(response.data));
            const userData = response.data;
            login(userData);

            if(savedId) {
                localStorage.setItem("savedId", id);
            } else {
                localStorage.removeItem("savedId");
            }

            navigate("/home");
        } catch(error) {
            alert("로그인 실패 :" + error.response.data);
        }
    };

    return (
        <Wrapper>
            <LoginText>로그인</LoginText>
            <LoginWrapper>
                <InputUI
                    ref={idFocus}
                    type="text"
                    placeholder="아이디를 입력하세요"
                    $width="80%"
                    $height="10%"
                    $margin="0 0 0 0"
                    $icon="img/user.png"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <ErrorWrapper $visible={writeId}>
                    <ErrorMessage>아이디를 입력하세요</ErrorMessage>
                </ErrorWrapper>
                <InputUI
                    ref={passwordFocus}
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    $width="80%"
                    $height="10%"
                    $margin="10px 0 0 0"
                    $icon="img/password.png"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ErrorWrapper $visible={writePassword}>
                    <ErrorMessage>비밀번호를 입력하세요</ErrorMessage>
                </ErrorWrapper>
                <CheckBoxWrapper>
                    <InputUI
                        type="checkbox"
                        checked={savedId}
                        $width="25px"
                        $height="25px"
                        onChange={(e) => setSavedId(e.target.checked)}
                    />
                    <CheckBoxText>아이디 저장</CheckBoxText>
                </CheckBoxWrapper>
                <Button title="로그인" $width="80%" $height="10%" $margin="0 0 30px 0" onClick={handleLogin}/>
                <Button title="회원가입" $width="80%" $height="10%" $margin="0 0 30px 0" onClick={() => {
                    navigate("/signUp")
                }} />       
                <FincButtonWrapper>
                    <FindButton>아이디 찾기</FindButton>
                    <FindButton>비밀번호 찾기</FindButton>
                </FincButtonWrapper>     
            </LoginWrapper>
        </Wrapper>
    )
}

export default Login;