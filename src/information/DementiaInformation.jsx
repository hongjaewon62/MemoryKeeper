import { useEffect, useState } from "react";
import styled from "styled-components";
import { DementiaData } from "../data/DementiaData";
import { useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TitleWrapper = styled.div`
    margin-top: 5vh;
    margin-bottom: 5vh;
    width: 80%;

    @media (max-width: 800px) {
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
`

const Title = styled.span`
    font-size: clamp(12px, 2vw, 30px);
`

const OtherTapListWrppaer = styled.div`
    width: 80%;
    border-top: 2px solid #72BBEE;
    border-bottom: 2px solid #72BBEE;
    padding: 1vh 2vh;
`

const TapListTitle = styled.span`
    padding: 1vw;
    font-weight: ${({ $isActive }) => ($isActive ? "900" : "500")};
    font-size: clamp(10px, 3vw, 18px);
    color: ${({ $isActive }) => ($isActive ? "#72BBEE" : "#000000")};
    cursor: pointer;
`

const ContentWrapper = styled.div`
    width: 80%;
    padding: 2vw;
`

const ContentHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const ContentTitle = styled.span`
    font-size: clamp(14px, 3vw, 28px);
    font-weight: 500;
`

const ContentText = styled.div`
    
`


function DementiaInformation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id = "1", title = "치매의 정의" } = location.state || {};

    const [currentTabId, setCurrentTabId] = useState(id);
    const [currentTitle, setCurrentTitle] = useState(title)

    const currentTabData = DementiaData.find((item) => item.id === currentTabId) || DementiaData[0];

    useEffect(() => {
        setCurrentTabId(id);
        setCurrentTitle(title);
    }, [id, title]);

    const handleClick = (id) => {
        const tab = DementiaData.find((item) => item.id === id);
        if (!tab) return;
        setCurrentTabId(id);
        setCurrentTitle(title);
        navigate("/information", { state: { id, title } });
    };

    return(
        <Wrapper>
            <TitleWrapper>
                <Title>치매 정보</Title>
            </TitleWrapper>
            <OtherTapListWrppaer>
                {DementiaData.map((tab) => (
                    <TapListTitle
                        key={tab.id}
                        $isActive={currentTabId === tab.id}
                        onClick={() => handleClick(tab.id)}
                    >
                        {tab.title}
                    </TapListTitle>
                ))}
            </OtherTapListWrppaer>
            <ContentWrapper>
                <ContentHeaderWrapper>
                    <ContentTitle>{currentTabData.title}</ContentTitle>
                </ContentHeaderWrapper>
                {currentTabData.content.map((paragraph, idx) => (
                    <ContentText key={idx}>{paragraph}</ContentText>
                ))}
            </ContentWrapper>
        </Wrapper>
    )
}

export default DementiaInformation;