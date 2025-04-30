import styled from "styled-components";
import NavBar from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    width: 100%;
    height: clamp(40px, 10vh, 100px);
    border-bottom: 2px solid #C3E6FF;
`
const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: clamp(5px, 4vw, 20px);
    cursor: pointer;
`

const LogoTitle = styled.div`
    color: #3286C0;
    font-size: clamp(1.1vw, 1.7vw, 1.8vw);
    font-weight: 500;
    @media (max-width: 800px) {
        display: none;
    }
`

const LogoImg = styled.img`
    display: flex;
    width: clamp(30px, 4vw, 50px);
    height: clamp(30px, 4vw, 50px);
`

const LoginWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #72BBEE;
    border-radius: 100px;
    width: clamp(40px, 10vw, 160px);
    height: clamp(20px, 2.8vh, 40px);
    margin-right: clamp(5px, 4vw, 20px);
    cursor: pointer;
`

const LoginTitle = styled.span`
    color: white;
    font-size: clamp(0.5vw, 1.05vw, 1.1vw);
    font-weight: 500;
`

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleTogle = () => {
        setIsOpen((prev) => !prev);
    }

    return (
        <>
            <Wrapper>
                <LogoWrapper onClick={() => {
                    navigate("/")
                }}>
                    <LogoImg src="img/logo.PNG" />
                    <LogoTitle>기억지킴이</LogoTitle>
                </LogoWrapper>
                <NavBar onToggle={handleTogle}/>
                <LoginWrapper>
                    <LoginTitle onClick={() => {
                        navigate("/login")
                    }}>
                        로그인 / 회원가입
                    </LoginTitle>
                </LoginWrapper>
            </Wrapper>
            {isOpen && <DropDownMenu />}
        </>
    )
}

export default Header;