import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { UpdateCurrenciesValuesUseCase } from './UpdateCurrenciesValuesUseCase';

describe("Testes de atualização do valor das cotações no arquivo 'currencies.json'", () => {
    const fileHandler: any = {};
    const updateCurrenciesValuesUseCase = new UpdateCurrenciesValuesUseCase(fileHandler);

    test("Retorna erro quando a entrada é vazia", async () => {
        expect.assertions(3);

        try {
            await updateCurrenciesValuesUseCase.execute({
                currency: "",
                value: undefined
            });
        } catch (error) {
            expect(error.message).toBe("Entrada vazia");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando uma entrada específica é vazia", async () => {
        expect.assertions(3);

        try {
            await updateCurrenciesValuesUseCase.execute({
                currency: "",
                value: 1000
            });
        } catch (error) {
            expect(error.message).toBe("Moeda vazia");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando uma moeda é inválida", async () => {
        expect.assertions(3);

        try {
            await updateCurrenciesValuesUseCase.execute({
                currency: "GBP",
                value: 1000
            });
        } catch (error) {
            expect(error.message).toBe("Moeda inválida");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando o valor da cotação é inválido", async () => {
        expect.assertions(3);

        try {
            await updateCurrenciesValuesUseCase.execute({
                currency: "BRL",
                value: 0
            });
        } catch (error) {
            expect(error.message).toBe("O novo valor da cotação não deve ser menor ou igual a 0");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Atualiza com sucesso o arquivo 'currencies.json'", async () => {
        expect.assertions(1);
        
        fileHandler.write = jest.fn();
        
        try {
            await updateCurrenciesValuesUseCase.execute({
                currency: "BRL",
                value: 1000
            });

            expect(fileHandler.write).toHaveBeenCalled();
        } catch (error) {}
    })
});