import React from 'react';
import { ButtonContainer } from '../../styles/components/Button';

export interface ButtonProps {
    text: string,
    onClick: any,
    small?: boolean,
    outline?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, onClick, small, outline }) => {
    return (
        <ButtonContainer onClick={onClick} small={small} outline={outline}>
            {text}
        </ButtonContainer>
    )
}

export default Button;