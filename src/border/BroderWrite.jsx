import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import InputUI from "../ui/InputUI";
import BorderWriteEditor from "./BorderWriteEditor";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const BeforeTextWrapper = styled.div`
    width: 80%;
    margin-top: 5vh;
`

const BeforeText = styled.span`
    cursor: pointer;
`

const ContentWrapper = styled.div`
    width: 80%;
    margin-top: 2vh;
    padding: 1vh;
    border: 1px solid black;
    background: #F6FBFF;
`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.span`
    font-size: clamp(12px, 2vw, 30px);
    padding: 2vh;
`
const CategorySelect = styled.select`
    height: clamp(14px, 4vh, 30px);
    width: clamp(200px, 20%, 300px);
    margin-left: clamp(20px, 2vh, 30px);

    @media (max-width: 800px) {
        height: 16px;
        width : 140px;
    }
`

const BottomSubmitWrapper = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 2vh;
`

function BorderWrite() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (id) {
            api.get(`/borders/id/${id}`)
                .then(res => {
                    setCategory(res.data.category);
                    setTitle(res.data.title);
                    setContent(res.data.content);
                })
                .catch(err => {
                    alert("게시글 정보를 불러오지 못했습니다.");
                })
        }
    }, [id]);

    const handleContentChange = (value) => {
        setContent(value);
        // console.log("작성한 내용:", value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!category || !title || !content) {
            alert("모든 필드를 작성해 주세요.");
            return;
        }

        console.log("카테고리:", category);
        console.log("제목:", title);
        console.log("내용:", content);
        const user = JSON.parse(localStorage.getItem("user"));

        try {
            if (id) {
                // 수정
                await api.put(`/borders/id/${id}`, {
                    category,
                    title,
                    content,
                    userId: user.id,
                });
                navigate(`/borderDetail/${id}`);
            } else {
                // 작성
                const res = await api.post("/borders", {
                    category,
                    title,
                    content,
                    userId: user.id,
                });
                navigate(`/borderList`);
            }
        } catch (error) {
            alert("게시글 저장 실패: " + (error?.response?.data?.message || ""));
        }
    };

    return (
        <Wrapper>
            <BeforeTextWrapper>
                <BeforeText onClick={() => {
                        if (id) {
                            navigate("/borderList");
                        } else {
                            navigate(-1);
                        }
                }}>
                    &lt; 게시글로
                </BeforeText>
            </BeforeTextWrapper>
            <ContentWrapper>
                <form onSubmit={handleSubmit}>
                    <HeaderWrapper>
                        <Title>{id ? "게시글 수정" : "글쓰기"}</Title>
                        <Button title={id ? "수정" : "등록"} $width="10%" type="submit" onClick={handleSubmit} />
                    </HeaderWrapper>
                    <CategorySelect
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="" hidden>
                            게시판 선택
                        </option>
                        <option value="치매이야기"> 치매이야기</option>
                        <option value="노하우 공유"> 노하우 공유</option>
                        <option value="궁금해요"> 궁금해요</option>
                    </CategorySelect>
                    <InputUI
                        $margin="2vh"
                        $width="80%"
                        $background="white"
                        placeholder="제목을 입력하세요" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <BorderWriteEditor value={content} onContentChange={handleContentChange} />
                    <BottomSubmitWrapper>
                        <Button title={id ? "수정" : "등록"} $width="10%" type="submit" onClick={handleSubmit}/>
                    </BottomSubmitWrapper>
                </form>
            </ContentWrapper>
        </Wrapper>
    )
}

export default BorderWrite;