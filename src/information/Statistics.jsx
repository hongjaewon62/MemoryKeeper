import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InformationStatistics from "../chart/InformationStatistics";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: yellow; */
`

const TitleWrapper = styled.div`
    /* background: #2456ef; */
    margin-top: 5vh;
    width: 80%;
`

const Title = styled.span`
    font-size: clamp(12px, 2vw, 30px);
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F6FBFF;
    width: 80%;
    height: 120vh;
    margin-top: 5vh;
    border: 1px solid #000000;
`

const SearchWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F5F5F5;
    width: 80%;
    height: 20vh;
    margin-top: 5vh;
    border-radius: 20px;
    border: 1px solid #4d4d4d;
`

// const SearchTable = styled.table`
//     border: 1px solid #999999;
//     border-collapse: collapse;
// `
const SearchTable = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 20px;
`

const SearchTitle = styled.span`
    font-size: 24px;
`

const SearchSelect = styled.select`
    height: 30px;
    width: 200px;
    margin-left: 20px;
`

const SearchSubmit = styled.input`
    height: 30px;
    width: 100px;
    margin-left: 342px;
    background: #72BBEE;
    color: white;
    border: none;
    border-radius: 10px;

    cursor: pointer;
    &:hover {
        background: #5a84d2
    }
`

function Statistics() {
    return (
        <Wrapper>
            <TitleWrapper>
                <Title>치매 통계</Title>
            </TitleWrapper>
            <ContentWrapper>
                <SearchWrapper>
                    <form>
                    <SearchTable>
                        <SearchTitle>지역 선택</SearchTitle>
                        <SearchSelect name="year">
                            <option value="">연도 선택</option>
                        </SearchSelect>
                        <SearchSelect name="si">
                            <option value="">시도 선택</option>
                        </SearchSelect>
                        <SearchSelect name="sigungu">
                            <option value="">시/군/구 선택</option>
                        </SearchSelect>
                    </SearchTable>
                    <SearchTable>
                        <SearchTitle>통계 선택</SearchTitle>
                        <SearchSelect>
                            <option value="statistics">통계 선택</option>
                        </SearchSelect>
                        <SearchSubmit type="submit" value="검색"/>
                    </SearchTable>
                    </form>
                </SearchWrapper>
                <InformationStatistics />
            </ContentWrapper>
        </Wrapper>
    )
}

export default Statistics;