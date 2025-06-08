import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: start;
    background: #f6f6f6;
    width: 100%;
    z-index: 2;
`

const HeaderContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20vh;
    /* background: skyblue; */
`

const HeaderContentTitle = styled.div`
    font-weight: 500;
    padding: 0.6vh;
    font-size: clamp(8px, 2vw, 18px);
    cursor: pointer;

    &:hover {
    background: #DDDDDD;
    border-radius: 8px;
    user-select : none;
  }
`

function DropDownMenu() {
    const navigate = useNavigate();

    const handleNavigate = (path, id, title) => {
        navigate(path, {
            state: {id, title},
            replace: true
        })
    };

    return(
        <Wrapper>
            <HeaderContentWrapper>
                <HeaderContentTitle>
                    치매 정보 
                </HeaderContentTitle>
                <HeaderContentTitle onClick={() => {
                    navigate("/statistics")
                }}>
                    치매 통계
                </HeaderContentTitle>
            </HeaderContentWrapper>
            <HeaderContentWrapper>
                <HeaderContentTitle onClick={() => {
                    navigate("/center")
                }}>
                    시설 찾기
                </HeaderContentTitle>
            </HeaderContentWrapper>
            <HeaderContentWrapper>
                <HeaderContentTitle onClick={() => {
                    handleNavigate("/borderList", "1", "치매이야기")
                }}>
                    치매이야기
                </HeaderContentTitle>
                <HeaderContentTitle onClick={() => {
                    handleNavigate("/borderList", "2", "노하우 공유")
                }}>
                    노하우 공유
                </HeaderContentTitle>
                <HeaderContentTitle onClick={() => {
                    handleNavigate("/borderList", "3", "궁금해요")
                }}>
                    궁금해요
                </HeaderContentTitle>
            </HeaderContentWrapper>
            <HeaderContentWrapper>
                <HeaderContentTitle onClick={() => {
                    navigate("/musicListen")
                }}>
                    음악 듣기
                </HeaderContentTitle>
                <HeaderContentTitle onClick={() => {
                    navigate("/addMusic")
                }}>
                    음악 추가
                </HeaderContentTitle>
            </HeaderContentWrapper>
            <HeaderContentWrapper>
                <HeaderContentTitle>
                    기억력 게임
                </HeaderContentTitle>
                <HeaderContentTitle>
                    사고력 게임
                </HeaderContentTitle>
            </HeaderContentWrapper>
        </Wrapper>
    )
}

export default DropDownMenu;