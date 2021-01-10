import { BitcoinPrice, Currency } from '../../entities/BitcoinPrice';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { GetBitcoinPriceUseCase } from './GetBitcoinPriceUseCase';

describe("Testes para pegar a cotação do Bitcoin em outras moedas", () => {
    //Valores presentes no arquivos currencies.json inicial
    const currencies = {
        BRL: 5.4,
        EUR: 0.92,
        CAD: 1.44
    }

    const bitcoinDollarQuote = 6506.6717;
    const getBitcoinPriceUseCase = new GetBitcoinPriceUseCase();

    test("Retorna erro quando o valor de bitcoins em dólares é inválido", () => {
        expect.assertions(3);

        getBitcoinPriceUseCase.setBitcoinDollarQuote(undefined);

        try {
            getBitcoinPriceUseCase.execute();
            
        } catch (error) {
            expect(error.message).toBe("Valor da cotação em dólares inválido");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    })

    test("Valor da cotação em reais", () => {
        expect.assertions(4);
        getBitcoinPriceUseCase.setBitcoinDollarQuote(bitcoinDollarQuote);
        try {
            const prices = getBitcoinPriceUseCase.execute();

            expect(prices).toHaveLength(3);
            expect(prices[0]).toBeInstanceOf(BitcoinPrice);
            expect(prices[0].getCurrency()).toBe(Currency.BRL);
            expect(prices[0].getPrice()).toBe(
                bitcoinDollarQuote * currencies.BRL
            );

        } catch (error) {}
    });

    test("Valor da cotação em euros", () => {
        expect.assertions(4);
        
        try {
            const prices = getBitcoinPriceUseCase.execute();

            expect(prices).toHaveLength(3);
            expect(prices[1]).toBeInstanceOf(BitcoinPrice);
            expect(prices[1].getCurrency()).toBe(Currency.EUR);
            expect(prices[1].getPrice()).toBe(
                bitcoinDollarQuote * currencies.EUR
            );

        } catch (error) {}
    });

    test("Valor da cotação em dólares canadenses", () => {
        expect.assertions(4);
        
        try {
            const prices = getBitcoinPriceUseCase.execute();

            expect(prices).toHaveLength(3);
            expect(prices[2]).toBeInstanceOf(BitcoinPrice);
            expect(prices[2].getCurrency()).toBe(Currency.CAD);
            expect(prices[2].getPrice()).toBe(
                bitcoinDollarQuote * currencies.CAD
            );

        } catch (error) {}
    })
})