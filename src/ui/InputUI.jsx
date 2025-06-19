import styled from "styled-components";
import {FaEye, FaEyeSlash} from "react-icons/fa"
import { forwardRef, useState } from "react";

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: ${({ $width }) => $width || "100px"};
    height: ${({ $height }) => $height || "30px"};
    margin: ${({ $margin }) => $margin || "none"};
`

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

    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
        border: 2px solid #72bbee;
        outline: none;
    }
`

const Icon = styled.img`
    position: absolute;
    ${({ $iconPosition }) => ($iconPosition === "left" ? "left: 10px;" : "right: 10px;")}

    width: 20px;
    height: 20px;
`

const ShowPasswordButton = styled.button`
    position: absolute;
    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    right: 10px;
`

const InputUI = forwardRef(({ $width, $height, $margin, $background, type, placeholder, $icon, $iconPosition = "left", value, onChange, checked }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <InputWrapper 
            $width={$width}
            $margin={$margin}
            $height={$height}>
            {$icon && <Icon src={$icon} alt="icon" $iconPosition={$iconPosition} />}
            <StyledInput
                ref={ref}
                $background={$background}
                type={actualType}
                placeholder={placeholder}
                $icon={$icon}
                $iconPosition={$iconPosition}
                value={value}
                onChange={onChange}
                checked={checked}
            />
            {isPassword && (
                <ShowPasswordButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye size="20" /> : <FaEyeSlash size="20" /> }
                </ShowPasswordButton>
            )}
        </InputWrapper>
    );
})

export default InputUI;