import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Input from './index';

describe("Testes do componente Input", () => {
    test("Input renderizado", () => {
        const { getByPlaceholderText } = render(<Input type={"text"} placeholder={"Teste"} size={"medium"} />);

        const inputElement = getByPlaceholderText(/Teste/);

        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe("");
    });

    test("Input ao digitar", () => {
        const { getByPlaceholderText } = render(<Input type={"text"} placeholder={"Teste"} size={"medium"} />);

        const inputElement = getByPlaceholderText(/Teste/);

        fireEvent.change(inputElement, {
            target: {
                value: "Testando input"
            }
        })

        expect(inputElement.value).toBe("Testando input");
    });
})