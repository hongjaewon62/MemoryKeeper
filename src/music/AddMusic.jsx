import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5vh;
    margin-bottom: 10vh;
    width: 80%;
    
    @media (max-width: 800px) {
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
`

const Title = styled.span`
    font-size: clamp(12px, 2vw, 30px);
`

const QuestionWrapper = styled.div`
    position: relative;
`

const QuestionMark = styled.img`
    width: clamp(16px, 3vw, 30px);
    height: clamp(16px, 3vw, 30px);
    cursor: pointer;
`

const Question = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(20vw, 50vw, 70vw);
    height: clamp(3vw, 6vw, 10vw);
    padding: 1vh;
    background: white;
    border: 1px solid black;
    right: 40px;
    top: 10px;
    font-size:clamp(9px, 2vw, 16px);
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

const AddMusicButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    width: 90%;
    height: 5vh;
    font-size: clamp(16px, 4vw, 28px);
    height: clamp(20px, 4vw, 50px);
    user-select : none;
    cursor: pointer;

    &:hover {
        background: #efefef;
    }
`

const AddMusicInputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: clamp(20px, 4vw, 50px);
    border: 0.1px solid white;
`

const AddMusicInputButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
`

const AddMusicInput = styled.input`
    width: 70%;
    height: 100%;
    /* padding: 8px; */
    border-radius: 10px;
`

const InfoTable = styled.table`
    text-align: center;
    width: 90%;
    margin: 1vh 0;
    font-size: clamp(8px, 2vw, 16px);

    th {
        padding: 1vh;
    }


    .title {
        width: 65%;
        border-right: 0.2px solid gray;
        border-left: 0.2px solid gray;
    }

    .singer {
        width: 25%;
        border-right: 0.2px solid gray;
    }

    .duration {
        width: 10%;
        border-right: 0.2px solid gray;
    }
`

const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 5vh;
    border: 1px solid black;
    margin-top: 2vh;
    text-align: center;

    font-size: clamp(8px, 2vw, 16px);

    .title {
        width: 65%;
        border-right: 0.2px solid gray;
    }

    .singer {
        width: 25%;
        border-right: 0.2px solid gray;
    }

    .duration {
        width: 10%;
    }
`

const MenuWrapper = styled.div`
`

const MenuButton = styled.div`
    margin-right: 1vh;
    position: relative;
    cursor: pointer;
    user-select : none;
`

const DeleteButton = styled.div`
    position: absolute;
    cursor: pointer;
    background: #EE7272;
    color: white;
    border-radius: 5px;
    width: 5vh;
    z-index: 10;
    user-select : none;

    &:hover {
        background: #de6262;
    }
`

const NotificationText = styled.span`
    color: gray;
    margin: 2vh;
    font-size: clamp(16px, 2vh, 24px);
`

function AddMusic() {
    const [question, setQuestion] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [playlist, setPlaylist] = useState(() => {
        const saved = localStorage.getItem("playlist");
        return saved ? JSON.parse(saved) : [];
    });
    const [inputUrl, setInputUrl] = useState("");
    const [deleteMenu, setDeleteMenu] = useState(null);

    const [loginCheck, setLoginCheck] = useState(false);

    const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const minutes = parseInt(match[1] || 0, 10);
    const seconds = parseInt(match[2] || 0, 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

    const toggleQuestion = () => {
        setQuestion(!question);
    }

    const toggleAddMusicInput = () => {
        setShowInput(!showInput);
    }

    const toggleDeleteMenu = (id) => {
        setDeleteMenu(prev => (prev === id ? null : id));
    };
    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("정말 이 음악을 삭제하시겠습니까?");
        if (!confirmDelete)
            return;

        setPlaylist(playlist.filter((item) => item.id !== id));
        setDeleteMenu(null);
    }

    const extractVideoId = (url) => {
        if (!url || typeof url !== "string")
            return null;
        const regex = /(?:youtube\.com\/.+v=|youtu\.be\/)([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const fetchVideoInfo = async (videoId) => {
        const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`
        );
        const data = await res.json();
        const snippet = data.items[0].snippet;
        const duration = data.items[0].contentDetails.duration;
        return {
            id: videoId,
            title: snippet.title,
            artist: snippet.channelTitle,
            thumbnail: snippet.thumbnails.high.url,
            duration: formatDuration(duration),
        };
    };

    const addMusic = async () => {
        const id = extractVideoId(inputUrl);
        if (!id)
            return alert("올바른 링크를 입력하세요");
        const video = await fetchVideoInfo(id);
        setPlaylist([...playlist, video]);
        setInputUrl("");
        setShowInput(false);
    };

    useEffect(() => {
        localStorage.setItem("playlist", JSON.stringify(playlist));
    }, [playlist]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            setLoginCheck(false);
        }
        else {
            setLoginCheck(true);
        }
    }, [])

    return (
        <Wrapper>
            <TitleWrapper>
                <Title>마음 소리</Title>
                <QuestionWrapper>
                    <QuestionMark src="/img/questionmark.png" onClick={toggleQuestion}/>
                    {question && (
                        <Question>
                            음악 추가 버튼을 누른 후 원하는 음악의 유튜브 링크를 입력하고 등록버튼을 누르면 음악이 추가됩니다.
                        </Question>
                    )}
                </QuestionWrapper>
            </TitleWrapper>
            <ContentWrapper>
                {loginCheck ? (
                    <>
                        {!showInput ? 
                        <AddMusicButton onClick={toggleAddMusicInput}>
                            + 음악추가
                        </AddMusicButton>
                        :
                        <AddMusicInputWrapper>
                            <AddMusicInput
                                type="text"
                                value={inputUrl}
                                onChange={(e) => setInputUrl(e.target.value)}
                                placeholder="유튜브 링크 입력"
                            />
                            <AddMusicInputButtonWrapper>
                                <Button title="취소" $width="clamp(30px, 6vw, 100px)" $background="#EE7272" $hover="#EE7272" $active="#de6262" onClick={toggleAddMusicInput} />
                                <Button title="등록" $width="clamp(30px, 6vw, 100px)" onClick={addMusic} />
                            </AddMusicInputButtonWrapper>
                        </AddMusicInputWrapper>
                    }

                        <InfoTable>
                            <thead>
                                <tr>
                                    <th className="title">제목</th>
                                    <th className="singer">가수</th>
                                    <th className="duration">시간</th>
                                </tr>
                            </thead>
                        </InfoTable>
                    </>) :
                    (<NotificationText>
                        로그인해 음악을 추가해 보세요
                    </NotificationText>)
                }

                {playlist.map((item) => (
                    <ItemWrapper
                        key={item.id}
                    >
                        <span className="title">{item.title}</span>
                        <span className="singer">{item.artist}</span>
                        <span className="duration">{item.duration}</span>
                        <MenuWrapper>
                            <MenuButton onClick={() => toggleDeleteMenu(item.id)} >⋮</MenuButton>
                            {deleteMenu === item.id && (
                                <DeleteButton onClick={() => handleDelete(item.id)} >삭제</DeleteButton>
                            )}
                        </MenuWrapper>
                    </ItemWrapper>
                ))}
            </ContentWrapper>
        </Wrapper>
    )
}

export default AddMusic;