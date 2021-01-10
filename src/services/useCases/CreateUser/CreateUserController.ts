import { NextApiRequest, NextApiResponse } from 'next';
import { IBaseController } from '../IBaseController';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController implements IBaseController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ) {}

    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, password } = request.body;

        try {
            const token = await this.createUserUseCase.execute({
                email,
                password
            });

            return response.status(201).send({ token });
        } catch (error) {
            return response
                .status(error.status || 400)
                .json({ error: error.message || 'Unexpected error' })
        }
    }
}