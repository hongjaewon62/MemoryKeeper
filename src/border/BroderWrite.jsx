import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import InputUI from "../ui/InputUI";
import BorderWriteEditor from "./BorderWriteEditor";
import { useState } from "react";

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

    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");

    const handleContentChange = (value) => {
        setContent(value);
        // console.log("작성한 내용:", value);
  };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!category || !title || !content) {
            alert("모든 필드를 작성해 주세요.");
            return;
        }

        console.log("카테고리:", category);
        console.log("제목:", title);
        console.log("내용:", content);
  };

    return (
        <Wrapper>
            <BeforeTextWrapper>
                <BeforeText onClick={() => {
                    navigate(-1)
                }}>
                    &lt; 게시글로
                </BeforeText>
            </BeforeTextWrapper>
            <ContentWrapper>
                <form onSubmit={handleSubmit}>
                    <HeaderWrapper>
                        <Title>글쓰기</Title>
                        <Button title="등록" $width="10%" type="sumit" onClick={handleSubmit} />
                    </HeaderWrapper>
                    <CategorySelect
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="" hidden>
                            게시판 선택
                        </option>
                        <option value="1"> 기억나눔터</option>
                        <option value="2"> 노하우 공유</option>
                        <option value="3"> 궁금해요</option>
                    </CategorySelect>
                    <InputUI
                        $margin="2vh"
                        $width="80%"
                        $background="white"
                        placeholder="제목을 입력하세요" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <BorderWriteEditor onContentChange={handleContentChange} />
                    <BottomSubmitWrapper>
                        <Button title="등록" $width="10%" type="sumit" onClick={handleSubmit}/>
                    </BottomSubmitWrapper>
                </form>
            </ContentWrapper>
        </Wrapper>
    )
}

export default BorderWrite;