import { useEffect, useState } from "react";
import styled from "styled-components";
import { Sigungu } from "../data/Sigungu";
import Pagination from "react-js-pagination";
import axios from 'axios';

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

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F6FBFF;
    width: 80%;
    padding: 2vh 0;
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
    margin-top: 1vh;
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
    table-layout: auto; 
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

    .col-type {
        width: 20%;
    }

    .col-name {
        width: 55%; 
    }

    .col-phone {
        width: 25%;
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

const PaginationWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;

    ul {
        display: flex;
        list-style: none;
        padding: 0;
    }

    li {
        margin: 0 clamp(3px, 1vw, 8px);
        cursor: pointer;
        width: clamp(30px, 3vw, 40px);
        height: clamp(30px, 3vw, 40px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    li.active {
        background: #72bbee;
        border-radius: 5px;
    }

    li.active a {
        color: #ffffff;
    }

    a {
        color: #000000;
        text-decoration: none;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a:hover {
        background: #72bbee;
        color: #ffffff;
        border-radius: 5px;
    }
`

function Center() {
    const [selectSi, setSelectSi] = useState("전국");
    const [selectSigungu, setSelectSigungu] = useState("전국");

    const [centers, setCenters] = useState([]);
    const [keyword, setKeyword] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageRange, setPageRange] = useState(10);
    const itemsPerPage = 10;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleSiChange = (e) => {
            setSelectSi(e.target.value);
     }

    const getSigunguList = () => {
        const selected = Sigungu.find(item => item.label === selectSi);
        return selected ? selected.options : [];
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetchCenters(
        selectSi !== "전국" ? selectSi : "",
        selectSigungu !== "전국" ? selectSigungu : "",
        keyword
    );

    setCenters(data);
    setCurrentPage(1);
    };

    useEffect(() => {
    const fetchData = async () => {
        const data = await fetchCenters("", "", "");
        setCenters(data);
    };
    fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setPageRange(window.innerWidth <= 800 ? 3 : 10);
        }

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = centers.slice(indexOfFirst, indexOfLast);

    const fetchCenters = async(si, sigungu, keyword) => {
        const roadnameaddress = `${si} ${sigungu}`.trim();
        const validAddress = roadnameaddress !== "" ? roadnameaddress : null;
        const validName = keyword !== "" ? keyword : null;

        try {
            const response = await axios.get("/api/centers/search", {
                params: {
                    roadnameaddress: validAddress,
                    name: validName,
                },
            });
            return response.data;
        } catch (error) {
            console.error("데이터 불러오기 실패: ", error)
            return [];
        }
    }

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
                                <SearchInput type="text" placeholder="시설명을 입력하세요" onChange={
                                    (e) => setKeyword(e.target.value)
                                }/>
                            <SearchSubmit type="submit" value="검색"/>
                        </SearchTable>
                    </form>
                </SearchWrapper>

                <CenterWrapper>
                    <CenterTable>
                        <TableHeader>
                        <tr>
                            <th className="col-type">구분</th>
                            <th className="col-name">시설명 / 주소</th>
                            <th className="col-phone">전화번호</th>
                        </tr>
                        </TableHeader>
                        <TableBody>
                        {currentItems.map((centers, idx) => (
                            <tr key={idx}>
                            <td><CenterType>{centers.type}</CenterType></td>
                            <td>
                                <CenterInfo>
                                <CenterTitle>{centers.name}</CenterTitle>
                                <CenterAddress>{centers.roadnameaddress ? centers.roadnameaddress : centers.lotnumberaddress}</CenterAddress>
                                </CenterInfo>
                            </td>
                            <td>{centers.phonenumber}</td>
                            </tr>
                        ))}
                        </TableBody>
                    </CenterTable>
                </CenterWrapper>
            </ContentWrapper>

        <PaginationWrapper>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={centers.length}
                pageRangeDisplayed={pageRange}
                firstPageText={"<<"}
                lastPageText={">>"}
                nextPageText={">"}
                prevPageText={"<"}
                onChange={handlePageChange}
            />
        </PaginationWrapper>
</Wrapper>
    )
}

export default Center;