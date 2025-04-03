import styled from "styled-components";

const StyledButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.width || "100px"};
    height: ${(props) => props.height || "30px"};
    margin: ${(props) => props.margin || "none"};

    background: ${(props) => props.backgroundColor || "#72BBEE"};
    color: ${(props) => props.textColor || "#FFFFFF"};
    
    border-radius: 10px;
    font-size: clamp(10px, 1vw, 30px);
    cursor: pointer;

    &:hover {
        background: ${(props) => props.hover || "#72BBEE"};
    }

    &:active {
        background: ${(props) => props.active || "#5FACE2"};
    }
`

function Button(props) {
    const {title, backgroundColor, hover, active, textColor, width, height, margin, onClick} = props;
    return (
        <StyledButton
        backgroundColor={backgroundColor}
        hover={hover}
        active={active}
        textColor={textColor}
        width={width}
        height={height}
        margin={margin}
        onClick={onClick}
        >
        {title||"Button"}
        </StyledButton>
    )
}

export default Button;