import React from 'react';
import { InputContainer } from '../../styles/components/Input';

export interface InputProps {
    type: string
    placeholder?: string,
    onChange: any,
    width: string
}

const Input: React.FC<InputProps> = ({ type, placeholder, onChange, width }) => {
    return (
        <InputContainer
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            width={width}
        />
    )
}

export default Input;