import { UpdateCurrenciesValuesUseCase } from './UpdateCurrenciesValuesUseCase';
import { UpdateCurrenciesValuesController } from './UpdateCurrenciesValuesController';
import { FileHandler } from '../../tools/FileHandler';

const fileHandler = new FileHandler();

const updateCurrenciesValuesUseCase = new UpdateCurrenciesValuesUseCase(fileHandler);

const updateCurrenciesValuesController = new UpdateCurrenciesValuesController(
    updateCurrenciesValuesUseCase
);

export { updateCurrenciesValuesUseCase, updateCurrenciesValuesController };