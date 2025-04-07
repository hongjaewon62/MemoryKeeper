import styled from "styled-components";
import HomeChartGender from "../chart/HomeChartGender";
import HomeChartAge from "../chart/HomeChartAge";
import HomeChartSeverity from "../chart/HomeChartSeverity";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5vw;
    min-height: 100vh;
    /* background: red; */
`

const ChartWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    /* background: pink; */
`

const ChartContainer = styled.div`
    margin-left: clamp(0px, 5vw, 150px);
    margin-right: clamp(0px, 5vw, 150px);
`

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: clamp(30px, 6vw, 150px);
    /* background: skyblue; */
`

const Title = styled.div`
    /* padding-left: clamp(0px, 6vw, 150px); */
    color: black;
    font-weight: 700;
    font-size: clamp(12px, 2vw, 28px);
`

const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    /* background: #56e43a; */
`

const Content = styled.div`
    color: black;
    font-size: clamp(12px, 1vw, 28px);
`

function Home() {
    return (
        <Wrapper>
            <TitleWrapper>
                <Title>치매통계(2023)</Title>
            </TitleWrapper>
            <ChartWrapper>
                <ChartContainer>
                    <HomeChartGender />
                </ChartContainer>
                <ChartContainer>
                    <HomeChartAge />
                </ChartContainer>
                <ChartContainer>
                    <HomeChartSeverity />
                </ChartContainer>
            </ChartWrapper>
            <TitleWrapper>
                <Title>치매란?</Title>
            </TitleWrapper>
            <ContentWrapper>
                <Content>
                    <p>치매는 정상적으로 생활해오던 사람이 후천적으로 다양한 원인으로 인해 기억, 언어, 판단력 등의 여러 영역의 인지기능이 떨어져서 일상생활에 상당한 지장이 나타나는 상태로, 치매는 어떤 하나의 질병 명이 아니라, 특정한 조건에서 여러 증상들이 함께 나타나는 증상들의 묶음인 증후군입니다.</p>
                    <p>치매의 대표적인 초기 증상은 기억력 장애입니다. 나이가 들면서 젊었을 때에 비해 기억력은 저하 되지만, 치매는 이러한 정상적인 변화와는 다릅니다. 즉, 치매는 질병이며 나이가 들어서 생기는 자연스러운 결과가 아닙니다. 나이가 들면서 생기는 기억력 저하는 대개 사소한 일들에 국한되어 있으며, 개인의 일상생활을 심각하게 저해하지 않습니다.</p>
                    <p>과거에는 치매를 망령, 노망이라고 부르면서 노인이면 당연히 겪게 되는 노화 현상이라고 생각했으나, 최근의 많은 연구를 통해 분명한 뇌 질환으로 인식되고 있습니다. 두통이나 만성 기침, 피로감 등의 여러 증상들도 그 원인에 따라 치료법이 다르듯, 치매도 그 원인을 밝혀 적절한 치료법을 찾아내는 것이 원칙이므로, 치매에 대한 정확한 진단이 무엇보다도 중요합니다.</p>
                </Content>
            </ContentWrapper>
        </Wrapper>
    )
}

export default Home;