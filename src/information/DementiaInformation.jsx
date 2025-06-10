import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5vh;
    margin-bottom: 5vh;
    width: 80%;
`

const Title = styled.span`
    font-size: clamp(12px, 2vw, 30px);
`

function DementiaInformation() {
    return(
        <Wrapper>
            <TitleWrapper>
                <Title>치매 정보</Title>
            </TitleWrapper>
        </Wrapper>
    )
}

export default DementiaInformation;