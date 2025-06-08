import styled from 'styled-components';
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const AddButtonWrapper = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 80%;
    margin-bottom : 2vh;
`

const AddButton = styled.button`
    background: #72bbee;
    color: white;
    border: none;
    border-radius: 10px;
    width: 10vh;
    height: 3vh;
    cursor: pointer;
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
const PlayerBox = styled.div`
    width: 80%;
    max-width: 700px;
    margin-top: 3vh;
    border-radius: 10px;
`

const Thumbnail = styled.img`
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 10px;
`

const ProgressWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;

    @media (max-width: 800px) {
    width: 90%;
    }
`

const Progress = styled.input.attrs({ type: 'range' })`
    width: 70%;
    appearance: none;
    border-radius: 10px;
    background: ${({ value }) =>
        `linear-gradient(to right, #72bbee 0%, #72bbee ${value}%, #e7e7e7 ${value}%, #e7e7e7 100%)`};
    outline: none;

    &::-webkit-slider-runnable-track {
        height: 10px;
        border-radius: 10px;
    }

    &::-webkit-slider-thumb {
        appearance: none;
        width: 0;
        height: 0;
    }

    &::-moz-range-track {
        height: 10px;
        border-radius: 10px;
    }

    &::-moz-range-thumb {
        width: 0;
        height: 0;
        background: transparent;
        border: none;
    }
`;

const Time = styled.span`
    font-size: 16px;
    color: gray;
    padding: 0 20px;
`

const InfoWrapper = styled.div`
    text-align: center;
    margin: 1vh, 0;
    display: flex;
    flex-direction: column;
`

const InfoTitle = styled.span`
    padding: 5px;
    font-size: clamp(16px, 2vw, 24px);
    font-weight: 700;
`

const InfoArtist = styled.span`
    font-size: clamp(12px, 2vw, 20px);
`

const ControlWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    font-size: 20px;
    margin-top: 1.5vh;
`

const ControlItemImage = styled.img`
    max-width: 40px;
    max-height: 40px;

    @media (max-width: 800px) {
        width: 3vh;
        height: 3vh;
    }
`

const VolumeWrapper = styled.div`
    position: relative;
`

const VolumeInput = styled.input`
    height: 80px;
    writing-mode: sideways-lr;
    position: absolute;
    z-index: 10;
    right: 5vh;
    bottom: 1vh;

    @media (max-width: 800px) {
        height: 60px;
        right: 3vh;
    }
`

const NotificationText = styled.span`
    color: gray;
    margin: 2vh;
    font-size: clamp(16px, 2vh, 24px);
`

const Playlist = styled.ul`
    margin-top: 3vh;
`

const PlaylistItem = styled.li`
    cursor: pointer;
    padding: 5px 0;
    font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
    font-size: clamp(10px, 2vw, 16px);
`

const PlaylistTitle = styled.span`
    font-weight: 700;
    font-size: clamp(12px, 2vw, 24px);
`

function MusicListen() {
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState(() => {
        const saved = localStorage.getItem("playlist");
        return saved ? JSON.parse(saved) : [];
    });
    const [currentMusic, setCurrentMusic] = useState(0);
    const [progress, setProgress] = useState(0);
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState("true");
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);
    const [toggleVolume, setToggleVolume] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
          if (player && player.getCurrentTime && player.getDuration) {
              const currentTime = player.getCurrentTime();
              const duration = player.getDuration();
              setCurrentTime(currentTime);
              setDuration(duration);
              setProgress((currentTime / duration) * 100);
          }
      }, 1000);
      return () => clearInterval(interval);
      }, [player]);

    // 음악이 바뀌면 progress, currentTime 초기화
    // useEffect(() => {
    //     if (player && playlist[currentMusic]) {
    //         player.loadVideoById(playlist[currentMusic].id);
    //         setProgress(0);
    //         setCurrentTime(0);
    //         setDuration(0);
    //     }
    // }, [currentMusic, player]);

    const formatTime = (time) => {
        if (isNaN(time) || time === undefined || time === null)
            return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const shuffle = () => {
        const index = Math.floor(Math.random() * playlist.length);
        setCurrentMusic(index);
    };

    const togglePlayPause = () => {
        if(player) {
            if(isPlaying) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleProgressChange = (e) => {
        const newProgress = parseFloat(e.target.value);
        if (player && player.getDuration) {
            const newTime = (newProgress / 100) * player.getDuration();
            player.seekTo(newTime, true);
            setProgress(newProgress);
        }
    };

    const toggleVolumeButton = () => {
        setToggleVolume(!toggleVolume);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if(player && player.setVolume) {
            player.setVolume(newVolume);
        }
    };

    const video = playlist[currentMusic];

    return (
        <Wrapper>
            <TitleWrapper>
                <Title>
                    마음 소리
                </Title>
            </TitleWrapper>
            <AddButtonWrapper>
                <AddButton onClick={() => {
                    navigate("/addMusic")
                }}>+ 음악추가</AddButton>
            </AddButtonWrapper>
            <ContentWrapper>
                { video ? (
                    <>     
                        <PlayerBox>
                            <Thumbnail src={video.thumbnail} alt="썸네일" />
                            <YouTube 
                                videoId={video.id}
                                opts={{ width: "0", height: "0", playerVars: { autoplay: 1 } }}
                                onReady={(e) => setPlayer(e.target)}
                                onEnd={() => setCurrentMusic((prev) => (prev + 1) % playlist.length)}
                            />
                        </PlayerBox>

                        <ProgressWrapper>
                            <Time>{formatTime(currentTime)}</Time>
                            <Progress 
                                value={progress}
                                max={100}
                                onChange={handleProgressChange}
                            />
                            <Time>{formatTime(duration)}</Time>
                        </ProgressWrapper>
                        <InfoWrapper>
                            <InfoTitle>{video.title}</InfoTitle>
                            <InfoArtist>{video.artist}</InfoArtist>
                        </InfoWrapper>
                        <ControlWrapper>
                            <VolumeWrapper>
                                <ControlItemImage src="/img/volumeButton.png" onClick={toggleVolumeButton}/>
                                {toggleVolume && (
                                    <VolumeInput
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={volume}
                                        onChange={handleVolumeChange}
                                    />
                                )}
                            </VolumeWrapper>
                            <ControlItemImage src="/img/previousButton.png" onClick={() => setCurrentMusic((prev) => (prev - 1 + playlist.length) % playlist.length)}/>
                            {isPlaying ? <ControlItemImage src="/img/pauseButton.png" onClick={togglePlayPause}/> : <ControlItemImage src="/img/playButton.png" onClick={togglePlayPause}/>}
                            <ControlItemImage src="/img/nextButton.png" onClick={() => setCurrentMusic((prev) => (prev + 1) % playlist.length)}/>
                            <ControlItemImage src="/img/shuffleButton.png" onClick={shuffle}/>
                        </ControlWrapper>

                        <Playlist>
                            <PlaylistTitle>Playlist</PlaylistTitle>
                            {playlist.map((item, idx) => (
                                <PlaylistItem
                                    key={item.id}
                                    $active={idx === currentMusic}
                                    onClick={() => setCurrentMusic(idx)}
                                >
                                    {item.title} - {item.artist}
                                </PlaylistItem>
                            ))}
                        </Playlist>
                    </>
                ) : (
                <NotificationText>플레이리스트에 음악이 없습니다.</NotificationText>
            )}
            </ContentWrapper>
        </Wrapper>
    )
}

export default MusicListen;