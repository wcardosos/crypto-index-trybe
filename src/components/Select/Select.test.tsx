import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SelectOptions } from './index';
import Select from './index';

describe("Testes do componente Select", () => {
    const options = [
        SelectOptions.default,
        SelectOptions.BRL,
        SelectOptions.EUR,
        SelectOptions.CAD
    ]

    test("Select renderizado", () => {
        const { getByText } = render(<Select options={options} value={options[0]} onChange={() => jest.fn()} />);

        const selectElement = getByText('Selecione uma moeda ...');

        expect(selectElement).toBeInTheDocument();
    });

    test("Troca de valores do Select", () => {
        const onChange = jest.fn();

        const { getByText } = render(<Select options={options} value={options[0]} onChange={onChange} />);

        const selectElement = getByText('Selecione uma moeda ...');

        fireEvent.change(selectElement, {
            target: {
                value: "BRL"
            }
        });

        expect(selectElement.value).toBe("BRL");
    });
});