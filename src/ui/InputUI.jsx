import styled from "styled-components";

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: ${(props) => props.width || '100px'};
    height: ${(props) => props.height || '30px'};
    margin: ${(props) => props.margin || 'none'};
`;

const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    padding-left: ${(props) => (props.icon ? '35px' : '10px')};
    background: ${(props) => props.background || '#DDF0FF'};
    border: 1px solid #cccccc;
    border-radius: 5px;
    outline: none;
    font-size: clamp(10px, 1vw, 30px);
`;

const Icon = styled.img`
    position: absolute;
    left: 10px;
    width: 20px;
    height: 20px;
`;

function InputUI({ width, height, margin, background, type, placeholder, icon }) {
    return (
        <InputWrapper 
            width={width}
            margin={margin}
            height={height}>
            {icon && <Icon src={icon} alt="icon" />}
            <StyledInput
                background={background}
                type={type}
                placeholder={placeholder}
                icon={icon}
            />
        </InputWrapper>
    );
}

export default InputUI;