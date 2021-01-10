import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { GetBitcoinPriceUseCase } from './GetBitcoinPriceUseCase';
import { BitcoinPrice } from '../../entities/BitcoinPrice';
import { IBaseController } from '../IBaseController';

export class GetBitcoinPriceController implements IBaseController {
    constructor(
        private getBitcoinPriceUseCase: GetBitcoinPriceUseCase
    ) {}

    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        try {
            const coinDeskResponse = await axios.get("https://api.coindesk.com/v1/bpi/currentprice/BTC.json");
    
            const bitcoinQuotes = coinDeskResponse.data;

            this.getBitcoinPriceUseCase.setBitcoinDollarQuote(bitcoinQuotes.bpi.USD.rate_float);

            const otherCurrenciesBitcoinPrices = this.getBitcoinPriceUseCase.execute();

            for (let price of otherCurrenciesBitcoinPrices) {
                const currency = price.getCurrency();
                const description = price.getDescription();
                const rate_float = parseFloat(price.getPrice().toFixed(4));
                bitcoinQuotes.bpi = {
                    ...bitcoinQuotes.bpi,
                    [currency]: {
                        code: currency,
                        rate: rate_float.toString().replace(/\B(?=(\d{3})+(?!\d))/, ","),
                        description,
                        rate_float: rate_float
                    }
                }
            }

            return response.status(200).send(bitcoinQuotes);
        } catch (error) {
            return response
                .status(error.status || 400)
                .json({ error: error.message || 'Unexpected error' })
        }
    }
}