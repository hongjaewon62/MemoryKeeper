import styled from "styled-components";
import InformationStatistics from "../chart/InformationStatistics";
import { useEffect, useState } from "react";
import { Sigungu } from './../data/Sigungu';

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
`

const Title = styled.span`
    font-size: clamp(12px, 2vw, 30px);
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #F6FBFF;
    width: 80%;
    padding: 2vh 0;
    margin-bottom: 3vh;
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
const SearchTable = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    margin: clamp(1vh, 3vh, 30px);

    @media (max-width: 800px) {
        margin: 0;
        display: block;
    }
`

const SearchTitle = styled.span`
    font-size: clamp(14px, 2.5vh, 30px);
    margin-left: clamp(1vh, 3vh, 30px);
    @media (max-width: 800px) {
        font-size: 16px;
        display: block;
    }
`

const SearchSelect = styled.select`
    height: clamp(14px, 3vh, 30px);
    width: clamp(200px, 10vh, 300px);
    margin-left: clamp(20px, 3vh, 30px);

    @media (max-width: 800px) {
        height: 16px;
        width : 140px;
    }
`
const SearchSubmit = styled.input`
    height: clamp(20px, 3vh, 30px);
    width: clamp(100px, 3vh, 160px);
    margin-left: clamp(125px, 3vh, 230px);
    background: #72BBEE;
    color: white;
    border: 1px solid #787878;
    border-radius: 10px;

    cursor: pointer;
    &:hover {
        background: #5a84d2
    }

    @media (max-width: 800px) {
        display: none;
    }
`

const chartTitleMap = {
    "dementia-line": "치매 환자 수",
    "population-line": "노인 인구수",
    "prevalence-line": "치매 환자 유병률",
    "mild-cases-line": "경도환자수",
    "moderate-cases-line": "중등도 환자수",
    "severe-cases-line": "중증 환자수",
    "mci-patients-line": "경도인지 장애 환자수",
    "mci-prevalence-line": "경도인지장애 환자 유병률"
  };

function Statistics() {
    const [selectYear, setSelectYear] = useState("2024");
    const [selectSi, setSelectSi] = useState("전국");
    const [selectSigungu, setSelectSigungu] = useState("전국");
    const [selectGender, setSelectGender] = useState("전체");
    const [chartCode, setChartCode] = useState("dementia-line");
    const [submit, setSubmit] = useState(false);

    const handleSiChange = (e) => {
        setSelectSi(e.target.value);
        setSelectSigungu(e.target.value);
    }

    const getSigunguList = () => {
        const selected = Sigungu.find(item => item.label === selectSi);
        return selected ? selected.options : [];
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
    }

    useEffect(() => {
        setSubmit(true);
    })

    return (
        <Wrapper>
            <TitleWrapper>
                <Title>치매 통계</Title>
            </TitleWrapper>
            <ContentWrapper>
                <SearchWrapper>
                    <form onSubmit={handleSubmit}>
                        <SearchTable>
                            <SearchTitle>지역 선택</SearchTitle>
                            <SearchSelect name="year" value={selectYear} onChange={(e) => setSelectYear(e.target.value)}>
                                <option value="">연도 선택</option>
                                <option key="2015" value="2015">2015</option>
                                <option key="2016" value="2016">2016</option>
                                <option key="2017" value="2017">2017</option>
                                <option key="2018" value="2018">2018</option>
                                <option key="2019" value="2019">2019</option>
                                <option key="2020" value="2020">2020</option>
                                <option key="2021" value="2021">2021</option>
                                <option key="2022" value="2022">2022</option>
                                <option key="2023" value="2023">2023</option>
                                <option key="2024" value="2024">2024</option>
                            </SearchSelect>
                            <SearchSelect
                                name="si"
                                value={selectSi}
                                onChange={handleSiChange}>
                                <option value="">시도 선택</option>
                                {Sigungu.map((si) => (
                                    <option key={si.label} value={si.label}>
                                        {si.label}
                                    </option>
                                ))}
                            </SearchSelect>
                            <SearchSelect
                                name="sigungu"
                                value={selectSigungu}
                                onChange={(e) => setSelectSigungu(e.target.value)}>
                                <option value="">시/군/구 선택</option>
                                {getSigunguList().map((sigungu) => (
                                    <option key={sigungu.label} value={sigungu.label}>
                                        {sigungu.label}
                                    </option>
                                ))}
                            </SearchSelect> 
                        </SearchTable>
                        <SearchTable>
                            <SearchTitle>통계 선택</SearchTitle>
                            <SearchSelect value={chartCode} onChange={(e) => setChartCode(e.target.value)}>
                                <option value="statistics">통계 선택</option>
                                <option value="dementia-line">치매 환자 수</option>
                                <option value="population-line">노인 인구수</option>
                                <option value="prevalence-line">치매 환자 유병률</option>
                                <option value="mild-cases-line">경도 환자 수</option>
                                <option value="moderate-cases-line">중등도 환자 수</option>
                                <option value="severe-cases-line">중증 환자 수</option>
                                <option value="mci-patients-line">경도인지 장애 환자 수</option>
                                <option value="mci-prevalence-line">경도인지 장애 유병률</option>
                            </SearchSelect>
                            <SearchSelect value={selectGender} onChange={(e) => setSelectGender(e.target.value)}>
                                <option value="gender">성별 선택</option>
                                <option value="전체">전체</option>
                                <option value="남">남성</option>
                                <option value="여">여성</option>
                            </SearchSelect>
                            <SearchSubmit type="submit" value="검색"/>
                        </SearchTable>
                    </form>
                </SearchWrapper>

                { submit && (
                    <InformationStatistics
                        year={selectYear}
                        si={selectSi}
                        sigungu={selectSigungu}
                        gender={selectGender}
                        chartCode={chartCode}
                        chartTitle={chartTitleMap[chartCode]}
                    />
                )}
            </ContentWrapper>
        </Wrapper>
    )
}

export default Statistics;