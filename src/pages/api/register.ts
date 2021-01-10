import { NextApiRequest, NextApiResponse } from 'next';
import { createUserController } from '../../services/useCases/CreateUser';

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    return createUserController.handle(request, response);
}