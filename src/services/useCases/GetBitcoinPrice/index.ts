import { GetBitcoinPriceUseCase } from './GetBitcoinPriceUseCase';
import { GetBitcoinPriceController } from './GetBitcoinPriceController';

const getBitcoinPriceUseCase = new GetBitcoinPriceUseCase();

const getBitcoinPriceController = new GetBitcoinPriceController(getBitcoinPriceUseCase);

export { getBitcoinPriceUseCase, getBitcoinPriceController };