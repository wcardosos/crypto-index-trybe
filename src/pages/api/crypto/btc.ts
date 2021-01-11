import { NextApiRequest, NextApiResponse } from 'next';
import { getBitcoinPriceController } from '../../../services/useCases/GetBitcoinPrice';
import { updateCurrenciesValuesController } from '../../../services/useCases/UpdateCurrenciesValues';

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        return getBitcoinPriceController.handle(request, response);
    } else if (request.method === 'PUT') {
        return updateCurrenciesValuesController.handle(request, response);
    }

}