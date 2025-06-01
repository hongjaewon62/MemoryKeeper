import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3vh 0;
`

const BeforeTextWrapper = styled.div`
    width: 80%;
    margin-top: 5vh;
`

const BeforeText = styled.span`
    cursor: pointer;
    font-size: 20px;
`

const ContentWrapper = styled.div`
    width: 80%;
    margin-top: 5vh;
    border: 1px solid black;
    background: white;
    
`

const ContentHeaderWrapper = styled.div`
    border-bottom: 1px solid #AAAAAA;
    padding: 2vh;
`

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.span`
    font-size: clamp(18px, 2.5vw, 30px);
    font-weight: bold;
    margin-bottom: 1vh;
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    font-size: clamp(10px, 1vw, 16px);
    margin-bottom: 2vh;
`

const IdText = styled.span`
    margin-bottom: 1vh;
    color: #3f3f3f;
`

const InfoText = styled.span`
    margin-bottom: 1vh;
    padding-right: 10px;
    color: #777777;
`

const InfoTextWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const MenuWrapper = styled.div`
    position: relative;
`

const MenuButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`

const Dropdown = styled.ul`
    position: absolute;
    right: 0;
    top: 24px;
    list-style: none;
    padding: 0;
    margin: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 99;
`

const DropdownItem = styled.li`
    padding: 8px 16px;
    width: 4vh;
    text-align: center;
    border: 1px solid #f2f2f2;
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
    }
`

const Content = styled.div`
    white-space: pre-wrap;
    line-height: 1.6;
    font-size: clamp(12px, 1.2vw, 20px);
    margin-bottom: 20vh;
    padding: 1vh;

    img {
        max-width: 400px;
        max-height: 400px;
    }
`

const ReactionWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 3vh;
    font-size: Clamp(10px, 1.5vh, 20px);
    color: #444444;
    padding: 2vh;
`

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    padding: 2vh;
`

const Comment = styled.div`
    margin-bottom: 16px;
    padding: 10px;
    font-size: Clamp(10px, 1.5vh, 20px);
    border-bottom: 0.5px solid #e6e6e6;
`

const CommentItemWrapper = styled.div`
    /* display: flex; */
    /* width: 70%; */
`

const CommentContentWrapper = styled.div`
    display: flex;
    /* width: 80%; */
    /* background: yellow; */
`

const CommentHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CommentIdWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    font-weight: 800;
`

const CommentMenuButton = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
`

const CommentDate = styled.span`
    font-Size: 0.85em;
    color: #777777;
`

const CommentInputWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-top: 10px;
`

const CommentInput = styled.textarea`
    width: 100%;
    padding: 10px 80px 10px 10px;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 5px;
    overflow-y: auto;
    border: 0.5px solid gray;
    resize: none;
    min-height: 40px;
    max-height: 60px;
    line-height: 1.5;
    transition: min-height 0.1s;
`

const SubmitButton = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 6px 12px;
    font-size: 14px;
    background: #72BBEE;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`

function BorderDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [showDropdown, setShowDropdown] = useState(false);
    const [commentShowDropdown, setCommentShowDropdown] = useState(null); 
    const [border, setBorder] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const commentInputTextarea = useRef();

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2); // 01~12
        const day = (`0${date.getDate()}`).slice(-2);        // 01~31
        const hours = (`0${date.getHours()}`).slice(-2);     // 00~23
        const minutes = (`0${date.getMinutes()}`).slice(-2); // 00~59

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const handleInputChange = (e) => {
        setCommentInput(e.target.value);
        const textarea = commentInputTextarea.current;
        if(textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.style.height = textarea.scrollHeight + "px";
        }
    }

    const handleDelete = async () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`/api/borders/id/${id}?userId=${user.id}`);
                alert("삭제되었습니다.");
                navigate("/borderList");
            } catch (err) {
                alert("삭제 실패: " + (err?.response?.data?.message || err));
            }
        }
    };

    const handleEdit = () => {
        navigate(`/borderEdit/${id}`);
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(`/api/comments/${id}`);
            setComments(res.data);
        } catch(e) {
            setComments([]);
        }
    };

    const handleCommentSubmit = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (!commentInput.trim())
            return;
        try {
            await axios.post("/api/comments", {
                borderId: id,
                userId: user.id,
                content: commentInput
            });
            setCommentInput("");
            fetchComments(); // 댓글 새로고침
        } catch (e) {
            alert("댓글 등록 실패");
        }
    };

    const handleCommentDelete = async (commentId, commentUserId) => {
        if (!user || user.id !== commentUserId) {
            alert("본인 댓글만 삭제할 수 있습니다.");
            return;
        }
        if (!window.confirm("댓글을 삭제할까요?")) return;
        try {
            await axios.delete(`/api/comments/${commentId}?userId=${user.id}`);
            fetchComments();
        } catch (e) {
            alert("댓글 삭제 실패");
        }
    };

    useEffect(() => {
        axios.get(`/api/borders/id/${id}`)
        .then((res) => setBorder(res.data))
        .catch((err) => console.log("게시글 오류 : ", err))

        fetchComments();
    }, [id]);

    if (!border) return <div>로딩 중...</div>;

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
                <ContentHeaderWrapper>
                    <TitleWrapper>
                        <Title>{border.title}</Title>

                        <MenuWrapper>
                            {user && border.username === user.username && (
                            <>
                                <MenuButton onClick={() => setShowDropdown(!showDropdown)}>⋮</MenuButton>
                                {showDropdown && (
                                <Dropdown>
                                    <DropdownItem onClick={handleEdit}>수정</DropdownItem>
                                    <DropdownItem onClick={handleDelete}>삭제</DropdownItem>
                                </Dropdown>
                                )}
                            </>
                            )}
                        </MenuWrapper>
                    </TitleWrapper>
                    <InfoWrapper>
                        <IdText>{border.username}</IdText>
                        <InfoTextWrapper>
                            <InfoText>{formatDate(border.createdAt)}</InfoText>
                            <InfoText>조회수 {border.viewCount}</InfoText>
                        </InfoTextWrapper>
                    </InfoWrapper>
                </ContentHeaderWrapper>
                <Content dangerouslySetInnerHTML={{ __html: border.content }} />

                {/* <ReactionWrapper>{`🤍 공감 2 💬 댓글 2`}</ReactionWrapper> */}

                <CommentWrapper>
                    {comments.length === 0 && <div>댓글이 없습니다.</div>}
                    {comments.map((comment) => (
                        <Comment key={comment.id}>
                            <CommentItemWrapper>
                                <CommentHeaderWrapper>
                                    <CommentIdWrapper>
                                        {comment.username}
                                    </CommentIdWrapper>
                                    <MenuWrapper>
                                        {user && comment.username === user.username && (
                                        <>
                                            <CommentMenuButton onClick={() =>
                                                setCommentShowDropdown(commentShowDropdown === comment.id ? null : comment.id)
                                            }>
                                                ⋮
                                            </CommentMenuButton>
                                            {commentShowDropdown === comment.id && (
                                            <Dropdown>
                                                <DropdownItem >수정</DropdownItem>
                                                <DropdownItem onClick={() => handleCommentDelete(comment.id, comment.userId)}>삭제</DropdownItem>
                                            </Dropdown>
                                            )}
                                        </>
                                        )}
                                    </MenuWrapper>
                                </CommentHeaderWrapper>
                                <CommentContentWrapper>
                                    {comment.content}
                                </CommentContentWrapper>
                            </CommentItemWrapper>
                            <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
                            {/* {user && comment.userId === user.id && (
                                <button
                                    style={{marginLeft: 10, color: "red", border: "none", background: "none", cursor: "pointer"}}
                                    onClick={() => handleCommentDelete(comment.id, comment.userId)}
                                >삭제</button>
                            )} */}
                        </Comment>
                    ))}
                    <CommentInputWrapper>
                        <CommentInput
                            placeholder="댓글을 남겨보세요."
                            value={commentInput}
                            onChange={handleInputChange}
                            onKeyDown={e => {
                                // shift+enter 줄바꿈 / enter 등록
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleCommentSubmit();
                                }
                            }}
                        />
                        <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
                    </CommentInputWrapper>
                </CommentWrapper>
            </ContentWrapper>
        </Wrapper>
    );
}

export default BorderDetail;
