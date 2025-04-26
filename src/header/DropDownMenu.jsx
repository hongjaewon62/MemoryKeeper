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
  }
`

function DropDownMenu() {
    return(
        <Wrapper>
            <HeaderContentWrapper>
                <HeaderContentTitle>
                    치매 정보 
                </HeaderContentTitle>
                <HeaderContentTitle>
                    치매 통계
                </HeaderContentTitle>
            </HeaderContentWrapper>
            <HeaderContentWrapper>
                <HeaderContentTitle>
                    센터 찾기
                </HeaderContentTitle>
            </HeaderContentWrapper>
            <HeaderContentWrapper>
                <HeaderContentTitle>
                    치매 이야기
                </HeaderContentTitle>
                <HeaderContentTitle>
                    노하우 공유
                </HeaderContentTitle>
                <HeaderContentTitle>
                    궁금해요
                </HeaderContentTitle>
            </HeaderContentWrapper>
            <HeaderContentWrapper>
                <HeaderContentTitle>
                    음악 듣기
                </HeaderContentTitle>
                <HeaderContentTitle>
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