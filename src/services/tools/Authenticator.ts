// Classe para manipulação dos tokens JWT
import * as jwt from 'jsonwebtoken';
import { IAuthenticationData } from './IAuthenticationData';

export class Authenticator {
    private static EXPIRES_IN = "120min";

    public generateToken(input: IAuthenticationData): string {
        const token = jwt.sign(
            {
                id: input.id,
                email: input.email
            },
            "desafio-fullstack-trybe-01-21",
            { expiresIn: Authenticator.EXPIRES_IN }
        );

        return token;
    }

    public getData(token: string): IAuthenticationData {
        // Em condições normais a chave JWT é colocada em variáveis ambiente
        const payload = jwt.verify(token, "desafio-fullstack-trybe-01-21") as any;
        const result: IAuthenticationData = {
            id: payload.id,
            email: payload.email
        };
        
        return result;
    }
}