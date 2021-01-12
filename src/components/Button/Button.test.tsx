import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from './index';

describe("Testes do componente Button", () => {
    test("Botão renderizado", () => {
        const { getByText } = render(<Button text={"Teste"} />);

        const buttonElement = getByText(/Teste/);

        expect(buttonElement).toBeInTheDocument();
    });

    test("Função onClick do componente Button sendo chamada", () => {
        const onClick = jest.fn();

        const { getByText } = render(<Button text={"Teste"} onClick={onClick} />);

        const buttonElement = getByText(/Teste/);

        fireEvent.click(buttonElement);

        expect(onClick).toHaveBeenCalled();
    });
})