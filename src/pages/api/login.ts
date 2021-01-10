import { NextApiRequest, NextApiResponse } from 'next';
import { loginUserController } from '../../services/useCases/LoginUser';

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    return loginUserController.handle(request, response);
}