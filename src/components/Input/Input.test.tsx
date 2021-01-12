import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Input from './index';

describe("Testes do componente Input", () => {
    test("Input renderizado", () => {
        const { getByPlaceholderText } = render(<Input value={""} type={"text"} placeholder={"Teste"} onChange={() => jest.fn()} width={"medium" } />);

        const inputElement = getByPlaceholderText(/Teste/);

        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe("");
    });

    test("Input ao digitar", () => {
        let value = "";
        const onChange = jest.fn((event) => {
            value = event.target.value
        });

        const { getByPlaceholderText } = render(<Input value={value} type={"text"} placeholder={"Teste"} onChange={onChange} width={"medium"} />);

        const inputElement = getByPlaceholderText(/Teste/);

        fireEvent.change(inputElement, {
            target: {
                value: "Testando input"
            }
        })

        expect(onChange).toHaveBeenCalled();
        expect(inputElement.value).toBe("Testando input");
    });
})