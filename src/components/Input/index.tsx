import React from 'react';
import { InputContainer } from '../../styles/components/Input';

export interface InputProps {
    value: string | number
    type: string
    placeholder?: string
    onChange: any
    width: string
}

const Input: React.FC<InputProps> = ({ value, type, placeholder, onChange, width }) => {
    return (
        <InputContainer
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            width={width}
            value={value}
        />
    )
}

export default Input;