import { useEffect, useState } from "react";
import styled from "styled-components";
import { Sigungu } from "../data/Sigungu";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TitleWrapper = styled.div`
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
    padding: 2vh 0;
    margin-top: 5vh;
    margin-bottom: 3vh;
    border: 1px solid #000000;

    @media (max-width: 800px) {
        width: 96%;
    }
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

const SearchInput = styled.input`
    height: clamp(14px, 3vh, 30px);
    width: clamp(420px, 20vh, 600px);
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
        
        margin-left: clamp(20px, 2vh, 100px);
    }
`

const CenterWrapper = styled.div`
    width: 80%;
    background: #F6FbFF;
    border: 1px solid #72bbee;
    border-radius: 20px;
    margin: 2rem auto;
    overflow: hidden;
`

const CenterTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`

const TableHeader = styled.thead`
  background: #C3E6FF;
  font-weight: bold;

  th {
    padding: 1.5vh;
    text-align: center;
    border-bottom: 1px solid #9fd7ff;
    font-size: clamp(12px, 1vw, 30px);
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #9fd7ff;

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 1vh;
    text-align: center;
    font-size: clamp(12px, 0.9vw, 30px);
    border-right: 1px solid #9fd7ff;

    &:last-child {
        border-right: none;
    }
    
  }
`;

const CenterType = styled.span`
    display: inline-block;
    background: #72BBEE;
    color: white;
    border-radius: 100px;
    padding: clamp(5px, 1vh, 20px);
    font-size: clamp(8px, 1.5vh, 20px);
`

const CenterInfo = styled.div`
  text-align: left;
`;

const CenterTitle = styled.strong`
    display: block;
    font-size: clamp(12px, 1.8vh, 24px);
`

const CenterAddress = styled.span`
    display: block;
    color: #3e3e3e;
    margin-top: clamp(5px, 1vh, 20px);
    font-size: clamp(10px, 1.6vh, 20px);
`

function Center() {
    const [selectSi, setSelectSi] = useState("전국");
    const [selectSigungu, setSelectSigungu] = useState("전국");
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

    const centers = Array({
        type: "중앙",
        name: "중앙치매센터",
        address: "서울특별시 중구 을지로 245 (을지로 6가 18-79) 국립중앙의료원 중앙치매센터",
        phone: "166-6-0921",
        },
        {
            type: "광역",
            name: "서울특별시 광역치매센터",
            address: "서울시 종로구 대학로 47 이화에수풀 2층",
            phone: "02-3431-7200",
        },
        {
            type: "광역",
            name: "부산광역시 광역치매센터",
            address: "부산광역시 서구 대신공원로 26, 동아대학교병원 센터동 10층",
            phone: "051-240-2560",
        },
        {
            type: "광역",
            name: "대구광역시 광역치매센터",
            address: "대구광역시 북구 호국로 807 칠곡경북대학교병원 2층",
            phone: "053-323-6321",
        },
        {
            type: "광역",
            name: "인천광역시 광역치매센터",
            address: "인천광역시 부평구 동수로 56 가톨릭대학교인천성모병원 제3별관 1층",
            phone: "032-472-2027",
        },
        {
            type: "광역",
            name: "광주광역시 광역치매센터",
            address: "광주 동구 제봉로 27 (학동) 한일빌딩 4층",
            phone: "062-226-2182",
        },
        {
            type: "광역",
            name: "대전광역시 광역치매센터",
            address: "대전광역시 중구 문화로 282 충남대병원 노인보건의료센터 2층",
            phone: "042-280~8965",
        },
        {
            type: "광역",
            name: "울산광역시 광역치매센터",
            address: "울산 중구 태화로 240 (태화동, 동강병원남관) 6층",
            phone: "052-241-1591",
        },
        {
            type: "광역",
            name: "세종특별자치시 광역치매센터",
            address: "세종특별자치시 조치원읍 수원지1길 16",
            phone: "044-861-8540",
        },
        {
            type: "광역",
            name: "경기도 광역치매센터",
            address: "경기도 수원시 장안구 경수대로 1150번지 경기도 인재개발원 내 신관1층",
            phone: "031-271-7021",
        }
    )

    return (
        <Wrapper>
            <TitleWrapper>
                <Title>치매 시설 찾기</Title>
            </TitleWrapper>
            <ContentWrapper>
                <SearchWrapper>
                    <form onSubmit={handleSubmit}>
                        <SearchTable>
                            <SearchTitle>지역 선택</SearchTitle>
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
                            <SearchSelect style={{visibility: "hidden"}} />
                        </SearchTable>
                        <SearchTable>
                            <SearchTitle>시설 검색</SearchTitle>
                                <SearchInput type="text" placeholder="시설명을 입력하세요"/>
                            <SearchSubmit type="submit" value="검색"/>
                        </SearchTable>
                    </form>
                </SearchWrapper>

    <CenterWrapper>
      <CenterTable>
        <TableHeader>
          <tr>
            <th>구분</th>
            <th>시설명 / 주소</th>
            <th>전화번호</th>
          </tr>
        </TableHeader>
        <TableBody>
          {centers.map((center, idx) => (
            <tr key={idx}>
              <td><CenterType>{center.type}</CenterType></td>
              <td>
                <CenterInfo>
                  <CenterTitle>{center.name}</CenterTitle>
                  <CenterAddress>{center.address}</CenterAddress>
                </CenterInfo>
              </td>
              <td>{center.phone}</td>
            </tr>
          ))}
        </TableBody>
      </CenterTable>
    </CenterWrapper>
            </ContentWrapper>
        </Wrapper>
    )
}

export default Center;