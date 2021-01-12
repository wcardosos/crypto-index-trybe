import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './index';

describe("Testes do componente Header", () => {
    test("Container do header renderizado", () => {
        const { getByTestId } = render(<Header />);

        const headerElement = getByTestId("header");

        expect(headerElement).toBeInTheDocument();
    });

    test("Logo renderizada", () => {
        const { getByTestId } = render(<Header />);

        const logoElement = getByTestId("logo");

        expect(logoElement).toBeInTheDocument();
    });

    test("Renderização quando está logado no sistema", () => {
        const { getByTestId, getByText } = render(<Header />);

        const logoElement = getByTestId("logo");
        const logoutButton = getByText(/Sair/);

        expect(logoElement).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();
    });

    test("Renderização na atualização", () => {
        const { getByTestId } = render(<Header back />);

        const headerElement = getByTestId("header");
        const backButton = getByTestId("back-button");

        expect(headerElement).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
    });
})