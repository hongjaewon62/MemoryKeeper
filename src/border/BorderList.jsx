import { useEffect, useState } from "react";
import styled from "styled-components";
import InputUI from "../ui/InputUI";
import Button from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import axios from "axios";

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

const OtherBorderListWrppaer = styled.div`
    width: 80%;
    border-top: 2px solid #72BBEE;
    border-bottom: 2px solid #72BBEE;
    padding: 1vh 2vh;
`

const BorderListTitle = styled.span`
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
    font-size: clamp(10px, 3vw, 20px);
    font-weight: 500;
`

const ActionWrapper = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;

    .search {
        width: 100px
    }

    .write {
        background: white;
        border: 1px solid black;
    }
`
const BorderTable = styled.table`
    width: 100%;
    text-align: center;
    margin-top: 2vh;
    border-collapse: collapse;
    table-layout: auto;
    font-size: clamp(9px, 2vw, 16px);

    thead {
        th{
            padding: 1vh;
        }
    }
    
    tbody {
        tr {
            cursor: pointer;
        }

        td {
            border-top: 1.5px solid #72BBEE;
            border-bottom: 1.5px solid #72BBEE; 
        }
        .title {
            text-align: left;
            padding: 1.5vh;
            &:hover {
                text-decoration: underline;
            }
        }
    }

    .number {
        width: 10%;
    }

    .title {
        width: 60%;
    }

    .writer {
        width: 10%;
        @media (max-width: 800px) {
            width: 15%;
    }
    }

    .recodeDate {
        width: 10%;
        @media (max-width: 800px) {
            display: none;
    }
    }

    .hits {
        width: 10%;
        @media (max-width: 800px) {
            width: 15%;
    }
    }
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

function BorderList() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { id = "1", title = "치매이야기" } = location.state || {};
    const [borders, setBorders] = useState([]);

    const [currentBorder, setCurrentBorder] = useState(id);
    const [currentTitle, setCurrentTitle] = useState(title)

    const [currentPage, setCurrentPage] = useState(1);
    const [pageRange, setPageRange] = useState(10);
    const itemsPerPage = 10;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleClick = (id, title) => {
        setCurrentBorder(id);
        setCurrentTitle(title);
    };

    const handleWrite = () => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
            return;
        }
        else {
            navigate("/borderWrite");
        }
        }

    useEffect(() => {
        setCurrentBorder(id);
        setCurrentTitle(title);
    }, [id, title]);

    useEffect(() => {
        const handleResize = () => {
            setPageRange(window.innerWidth <= 800 ? 3 : 10);
    }

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const popularData = [
        { id: "인기글", title: "치매 예방에 좋은 습관", writer: "홍길동", recodeDate: "2025-05-15", hits: 123 },
        { id: "인기글", title: "치매 진단의 중요성", writer: "이순신", recodeDate: "2025-05-14", hits: 98 },
        { id: "인기글", title: "가족과 함께하는 치매 극복", writer: "김유신", recodeDate: "2025-05-13", hits: 245 },
    ]

    const boardData = [
    ...Array(150).fill().map((_, index) => ({
        id: index + 1,
        title: "치매 환자를 위한 지원 제도",
        writer: "홍길동",
        recodeDate: "2025-05-12",
        hits: Math.floor(Math.random() * 1001),
    }))
    ];
    

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = borders.slice(indexOfFirst, indexOfLast);

    const fetchBordersByCategory = async (category) => {
        try {
            const res = await axios.get(`/api/borders/${category}`);
            setBorders(res.data);
        } catch (error) {
            console.error("게시판 에러:", error);
        }
    };

    useEffect(() => {
        fetchBordersByCategory(currentTitle);
    }, [currentTitle]);

    return(
        <Wrapper>
            <TitleWrapper>
                <Title>기억나눔터</Title>
            </TitleWrapper>
            <OtherBorderListWrppaer>
                <BorderListTitle 
                    $isActive={currentBorder === "1"} 
                    onClick={() => handleClick("1", "치매이야기")
                }>
                    치매이야기
                </BorderListTitle>
                <BorderListTitle 
                    $isActive={currentBorder === "2"} 
                    onClick={() => handleClick("2", "노하우 공유")
                }>
                    노하우 공유
                </BorderListTitle>
                <BorderListTitle 
                    $isActive={currentBorder === "3"}
                    onClick={() => handleClick("3", "궁금해요")
                }>
                    궁금해요
                </BorderListTitle>
            </OtherBorderListWrppaer>
            <ContentWrapper>
                <ContentHeaderWrapper>
                    <ContentTitle>{currentTitle}</ContentTitle>
                    <ActionWrapper>
                        <InputUI type="text" placeholder="검색" $background="white" $width="50%" $height="10%" $margin="0 10px 0 0" $icon="img/search.png" $iconPosition="right"/>
                        <Button title="글쓰기" $width="20%" $height="10%" $margin="0 0 0 0" $textColor="black" $background="white" $hover="#e6e6e6" $active="#b9b9b9" $border="1px solid #cccccc" onClick={() => {
                            handleWrite();
                        }} />
                    </ActionWrapper>
                </ContentHeaderWrapper>
                <BorderTable>
                    <thead>
                        <tr>
                            <th className="number">번호</th>
                            <th className="title">제목</th>
                            <th className="writer">작성자</th>
                            <th className="recodeDate">등록일</th>
                            <th className="hits">조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {popularData.map((item) => (
                            <tr key={item.id}>
                                <td className="number"><b>{item.id}</b></td>
                                <td className="title"><b>{item.title}</b></td>
                                <td className="writer"><b>{item.writer}</b></td>
                                <td className="recodeDate"><b>{item.recodeDate}</b></td>
                                <td className="hits"><b>{item.hits}</b></td>
                            </tr>
                        ))}                        
                        {currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <tr key={item.id} onClick={() => {
                                    navigate(`/borderDetail/${item.id}`)
                                }}>
                                    <td className="number">{item.id}</td>
                                    <td className="title">{item.title}</td>
                                    <td className="writer">{item.username}</td>
                                    <td className="recodeDate">{item.createdAt?.slice(0, 10)}</td>
                                    <td className="hits">{item.viewCount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">게시글이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </BorderTable>
            </ContentWrapper>

            <PaginationWrapper>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={borders.length}
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

export default BorderList;