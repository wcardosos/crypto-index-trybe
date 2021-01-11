import { NextApiRequest, NextApiResponse } from 'next';
import { UpdateCurrenciesValuesUseCase } from './UpdateCurrenciesValuesUseCase';
import { IBaseController } from '../IBaseController';

export class UpdateCurrenciesValuesController implements IBaseController {
    constructor(
        private updateCurrenciesValuesUseCase: UpdateCurrenciesValuesUseCase
    ) {}

    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        try {
            const { currency, value } = request.body;

            await this.updateCurrenciesValuesUseCase.execute({
                currency,
                value
            });

            return response.status(200).send({});
        } catch (error) {
            return response
                .status(error.status || 400)
                .json({ error: error.message || 'Unexpected error' })
        }
    }
}