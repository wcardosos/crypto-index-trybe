import { NextApiRequest, NextApiResponse } from 'next';
import { getBitcoinPriceController } from '../../../services/useCases/GetBitcoinPrice';

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    return getBitcoinPriceController.handle(request, response);
}