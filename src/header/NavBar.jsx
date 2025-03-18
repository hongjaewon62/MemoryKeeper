import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const NavBarTitle = styled.div`
    font-size: clamp(10px, 2vw, 24px);
    padding: 0 clamp(10px, 3vw, 50px);
    cursor: pointer;
`

function NavBar()
{
    return(
        <Wrapper>
            <NavBarTitle>통계</NavBarTitle>
            <NavBarTitle>센터</NavBarTitle>
            <NavBarTitle>기억나눔터</NavBarTitle>
            <NavBarTitle>마음소리</NavBarTitle>
            <NavBarTitle>기억톡톡</NavBarTitle> 
        </Wrapper>
    )
}

export default NavBar;