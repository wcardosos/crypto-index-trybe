import { FileHandler } from '../../tools/FileHandler';
import { BitcoinPrice, ICurrency } from '../../entities/BitcoinPrice';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { IUpdateCurrenciesValuesUseCaseDTO } from './IUpdateCurrenciesValuesUseCaseDTO';
import { GenericError } from '../../errors/GenericError';
import path from 'path';
import currencies from '../../utils/currencies.json';

export class UpdateCurrenciesValuesUseCase {
    constructor(
        private fileHandler: FileHandler
    ) {}

    public async updateFile(currency: ICurrency, value: number): Promise<void> {
        const file = `${path.resolve('src', 'services', 'utils')}/currencies.json`;

        currencies[currency] = value.toString();

        const updateResult = await this.fileHandler.write(file, JSON.stringify(currencies));

        if (updateResult == false) {
            throw new GenericError("Não foi possível atualizar as cotações");
        }
    };
    
    public async execute(data: IUpdateCurrenciesValuesUseCaseDTO): Promise<void> {
        const { currency, value } = data;

        if (!currency && !value) throw new InvalidParameterError("Entrada vazia");
        else if (!currency) throw new InvalidParameterError("Moeda vazia");
        else if (value <= 0) throw new InvalidParameterError("O novo valor da cotação não deve ser menor ou igual a 0");
        
        const currencyToUpdate = BitcoinPrice.stringToCurrency(currency)

        await this.updateFile(
            currencyToUpdate,
            value
        );
    }
}