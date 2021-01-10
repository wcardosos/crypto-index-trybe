import { NextApiRequest, NextApiResponse } from 'next';
import { IBaseController } from '../IBaseController';
import { LoginUserUseCase } from './LoginUserUseCase';

export class LoginUserController implements IBaseController {
    constructor(
        private loginUserUseCase: LoginUserUseCase
    ) {}

    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, password } = request.body;

        try {
            const token = await this.loginUserUseCase.execute({
                email,
                unhashedPassword: password
            });

            return response.status(200).send({ token });
        } catch (error) {
            return response
            .status(error.status || 400)
            .json({ error: error.message || 'Unexpected error' })
        }
    }
}