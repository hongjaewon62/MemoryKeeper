import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const NavBarTitle = styled.div`
    font-size: clamp(9px, 2vw, 24px);
    padding: 0 clamp(8px, 3vw, 80px);
    cursor: pointer;
    user-select: none;
`

function NavBar({onToggle}) {
    return(
        <Wrapper>
            <NavBarTitle onClick={onToggle}>정보</NavBarTitle>
            <NavBarTitle onClick={onToggle}>시설</NavBarTitle>
            <NavBarTitle onClick={onToggle}>기억나눔터</NavBarTitle>
            <NavBarTitle onClick={onToggle}>마음소리</NavBarTitle>
            <NavBarTitle onClick={onToggle}>기억톡톡</NavBarTitle> 
        </Wrapper>
    )
}

export default NavBar;