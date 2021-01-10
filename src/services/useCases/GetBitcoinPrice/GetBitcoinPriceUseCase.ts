import { BitcoinPrice } from '../../entities/BitcoinPrice';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import currencies from '../../utils/currencies.json';

export class GetBitcoinPriceUseCase {
    private bitcoinDollarQuote: number;

    public setBitcoinDollarQuote(value: number): void { this.bitcoinDollarQuote = value }

    public execute(): BitcoinPrice[] {
        if (!this.bitcoinDollarQuote) throw new InvalidParameterError("Valor da cotação em dólares inválido");

        const prices = Object.entries(currencies).map( ([currency, price]) => {
            return new BitcoinPrice(
                parseFloat(price) * this.bitcoinDollarQuote,
                BitcoinPrice.stringToCurrency(currency)
            )
        });

        return prices; 
    }
}