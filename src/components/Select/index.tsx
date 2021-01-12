import React from 'react';
import { SelectContainer } from '../../styles/components/Select';


export enum SelectOptions {
    default = "Selecione uma moeda ...",
    BRL = "BRL",
    EUR = "EUR",
    CAD = "CAD"
}

interface SelectProps {
    options: SelectOptions[]
    value: SelectOptions
    onChange: any
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
    return (
        <SelectContainer value={value} onChange={onChange}>
            { options.map(option => <option key={option} value={option}>{option}</option>)}
        </SelectContainer>
    )
}

export default Select;