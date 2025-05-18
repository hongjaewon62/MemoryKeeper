import styled from "styled-components";

const StyledButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ $width }) => $width || "100px"};
    height: ${({ $height }) => $height || "30px"};
    margin: ${({ $margin }) => $margin || "none"};

    background: ${({ $background }) => $background || "#72BBEE"};
    color: ${({ $textColor }) => $textColor || "#FFFFFF"};
    border: ${({ $border }) => $border || "none"};

    border-radius: 10px;
    font-size: clamp(10px, 1vw, 30px);
    cursor: pointer;
    user-select: none;

    &:hover {
        background: ${({ $hover }) => $hover || "#72BBEE"};
    }

    &:active {
        background: ${({ $active }) => $active || "#5FACE2"};
    }
`

function Button(props) {
    const {title, $background, $hover, $active, $textColor, $width, $height, $margin, $border, onClick,} = props;
    return (
        <StyledButton
            $background={$background}
            $hover={$hover}
            $active={$active}
            $textColor={$textColor}
            $width={$width}
            $height={$height}
            $margin={$margin}
            $border={$border}
            onClick={onClick}
        >
        {title||"Button"}
        </StyledButton>
    )
}

export default Button;