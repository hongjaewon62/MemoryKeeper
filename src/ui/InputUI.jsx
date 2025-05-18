import styled from "styled-components";

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: ${({ $width }) => $width || "100px"};
    height: ${({ $height }) => $height || "30px"};
    margin: ${({ $margin }) => $margin || "none"};
`;

const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    padding-left: ${({ $icon, $iconPosition }) => ($icon && $iconPosition === "left" ? "35px" : "10px")};
    padding-right: ${({ $icon, $iconPosition }) => ($icon && $iconPosition === "right" ? "35px" : "10px")};
    background: ${({ $background }) => $background || "#DDF0FF"};
    border: 1px solid #cccccc;
    border-radius: 5px;
    outline: none;
    font-size: clamp(10px, 1vw, 30px);
`;

const Icon = styled.img`
    position: absolute;
    ${({ $iconPosition }) => ($iconPosition === "left" ? "left: 10px;" : "right: 10px;")}

    width: 20px;
    height: 20px;
`;

function InputUI({ $width, $height, $margin, $background, type, placeholder, $icon, $iconPosition = "left", value, onChange }) {
    return (
        <InputWrapper 
            $width={$width}
            $margin={$margin}
            $height={$height}>
            {$icon && <Icon src={$icon} alt="icon" $iconPosition={$iconPosition} />}
            <StyledInput
                $background={$background}
                type={type}
                placeholder={placeholder}
                $icon={$icon}
                $iconPosition={$iconPosition}
                value={value}
                onChange={onChange}
            />
        </InputWrapper>
    );
}

export default InputUI;