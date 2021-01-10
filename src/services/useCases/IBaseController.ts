import { NextApiRequest, NextApiResponse } from 'next';

export interface IBaseController {
    handle(request: NextApiRequest, response: NextApiResponse): Promise<void>;
}