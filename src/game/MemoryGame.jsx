import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";

const imageFiles = [
    "apple.png",
    "banana.png",
    "cherry.png",
    "coconut.png",
    "grapes.png",
    "greenApple.png",
    "kiwi.png",
    "lemon.png",
    "mango.png",
    "melon.png",
    "orange.png",
    "peach.png",
    "pear.png",
    "persimmon.png",
    "pineapple.png",
    "strawberry.png",
    "tomato.png",
    "watermelon.png",
];

const generateCards = () => {
    const duplicated = [...imageFiles, ...imageFiles];
    return duplicated
    .map((filename) => ({
        src: `/img/fruit/${filename}`,
        id: Math.random()
    }))
    .sort(() => Math.random() - 0.5);
};

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
    margin-bottom: 5vh;
    width: 80%;
`

const TitleGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
`

const Title = styled.span`
    font-size: clamp(12px, 2vw, 30px);
`

const SubTitle = styled.span`
    font-size: clamp(8px, 1.5vw, 20px);
    color: gray;
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
const ScoreBoard = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    font-size: 18px;
    padding: 3vh;
`

const ScoreWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
`

const TimeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const TimeText = styled.span`
    font-weight: 700;
    font-size: clamp(8px, 2vw, 24px);
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 100px);
    grid-gap: 10px;
`;

const Card = styled.div`
    width: 100px;
    height: 100px;
    background: #72bbee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 10px;
    perspective: 600px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;

    &.flipped {
        transform: rotateY(180deg);
    }
`

const CardInner = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
`;

const CardFront = styled.div`
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #72bbee;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    z-index: 2;
`;

const CardBack = styled.div`
    transform: rotateY(180deg);
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-radius: 10px;
`;

const CardImg = styled.img`
    width: 60px;
    height: 60px;
`

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
`

function MemoryGame() {
    const [question, setQuestion] = useState(false);
    const [cards, setCards] = useState(generateCards());
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('memoryHighScore')) || 0);
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [previewTime, setPreviewTime] = useState(5);
    const [isPreview, setIsPreview] = useState(true);
    const [isStarted, setIsStarted] = useState(false);

    const timerRef = useRef(null);

    useEffect(() => {
        if (!isPreview) return;

        setPreviewTime(5);

        const previewTimer = setInterval(() => {
            setPreviewTime(prev => {
            if (prev <= 1) {
                clearInterval(previewTimer);
                setIsPreview(false);
                return 0;
            }
            return prev - 1;
            });
    }, 1000);

        return () => clearInterval(previewTimer);
    }, [isPreview]);

    useEffect(() => {
        clearInterval(timerRef.current);
        if (!isPreview && !gameOver && isStarted) {
            timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [isPreview, gameOver, isStarted]);

    useEffect(() => {
        if (matched.length === cards.length && isStarted) {
            setGameOver(true);
            clearInterval(timerRef.current);
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('memoryHighScore', score);
            }
        }
    }, [matched]);

    const toggleQuestion = () => setQuestion(!question);

    const handleClick = (idx) => {
        if (isPreview || flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;

        const newFlipped = [...flipped, idx];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].src === cards[second].src) {
                setMatched([...matched, first, second]);
                setScore(s => s + 10);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 500);
            }
        }
    };
    
    const resetGame = () => {
        clearInterval(timerRef.current);
        setCards(generateCards());
        setFlipped([]);
        setMatched([]);
        setScore(0);
        setTime(0);
        setGameOver(false);
        setIsStarted(true);
        setIsPreview(true);
    };

    const startGame = () => {
        setCards(generateCards());
        setFlipped([]);
        setMatched([]);
        setScore(0);
        setTime(0);
        setGameOver(false);
        setIsStarted(true);
        setIsPreview(true);
    };


    return (
        <Wrapper>
            <TitleWrapper>
                <TitleGroup>
                    <Title>기억톡톡</Title>
                    <SubTitle>기억력 게임</SubTitle>
                </TitleGroup>
                <QuestionWrapper>
                    <QuestionMark src="/img/questionmark.png" onClick={toggleQuestion}/>
                    {question && (
                        <Question>
                            ? 카드를 눌러 같은 것을 찾아 짝을 맞추면 점수를 획득합니다.
                        </Question>
                    )}
                </QuestionWrapper>
            </TitleWrapper>
            <ContentWrapper>
                <ScoreBoard>
                    <ScoreWrapper>
                        <Title>점수: {score}</Title>
                        <div>최고 점수: {highScore}</div>
                    </ScoreWrapper>
                    {isStarted && <TimeWrapper>
                        <Title>시간</Title>
                        <TimeText> {isPreview ? `${previewTime}초` : `${time}초`}</TimeText>
                    </TimeWrapper>}
                    {isStarted && <Button title="다시 시작" $width="10%" $height="10%" onClick={resetGame} />}
                </ScoreBoard>
                {!isStarted ? (
                    <Button title="게임 시작" $width="50%" $height="50px" onClick={startGame} />
                ) : (
                    <Grid>
                        {cards.map((card, idx) => {
                            const isFlipped = flipped.includes(idx) || matched.includes(idx) || isPreview;
                            return (
                                <Card key={card.id} className={isFlipped ? "flipped" : ""} onClick={() => handleClick(idx)}>
                                    <CardInner>
                                        <CardFront>❓</CardFront>
                                        <CardBack>
                                            <CardImg src={card.src} alt="card"/>
                                        </CardBack>
                                    </CardInner>
                                </Card>
                            );
                        })}
                    </Grid>
                )}
                {gameOver && (
                    <Modal>
                        <ModalContent>
                            <h2>게임 종료!</h2>
                            <p>최종 점수: {score}</p>
                            <p>소요 시간: {time}초</p>
                            <Button title="다시 시작" $width="100%" $height="20%" onClick={resetGame} />
                        </ModalContent>
                    </Modal>
                )}
            </ContentWrapper>
        </Wrapper>
    )
}

export default MemoryGame;