import { Authenticator } from '../../tools/Authenticator';
import { HashManager } from '../../tools/HashManager';
import { IdGenerator } from '../../tools/IdGenerator';
import { ILoginUserDTO } from './ILoginUserDTO';
import { PostgresUsersRepository } from '../../repositories/Users/PostgresUsersRepository';
import { InvalidParameterError } from '../../errors/InvalidParameterError';

export class LoginUserUseCase {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private usersRepository: PostgresUsersRepository
    ) {}

    public async execute(data: ILoginUserDTO): Promise<string> {
        const { email, unhashedPassword } = data;

        if (!email && !unhashedPassword) throw new InvalidParameterError("Entrada vazia");
        else if (!email) throw new InvalidParameterError("Email vazio");
        else if (!unhashedPassword) throw new InvalidParameterError("Senha vazia");

        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new InvalidParameterError("Email não cadastrado");

        if (!await this.hashManager.compare(
            unhashedPassword, 
            user.getPassword()
        )) throw new InvalidParameterError("Senha incorreta");

        const token = this.authenticator.generateToken({
            id: user.getId(),
            email: user.getEmail()
        })

        return token;
    }
}