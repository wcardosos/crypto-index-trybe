import { Authenticator } from '../../tools/Authenticator';
import { HashManager } from '../../tools/HashManager';
import { IdGenerator } from '../../tools/IdGenerator';
import { ICreateUserDTO } from './ICreateUserDTO';
import { PostgresUsersRepository } from '../../repositories/Users/PostgresUsersRepository';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { User } from '../../entities/User';

export class CreateUserUseCase {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private usersRepository: PostgresUsersRepository
    ) {}

    public async execute(data: ICreateUserDTO): Promise<string> {
        const { email, password } = data;
        
        if (!email && !password) throw new InvalidParameterError("Entrada vazia");
        else if (!email) throw new InvalidParameterError("Email vazio");
        else if (
            email.indexOf('@') === -1 ||
            email.substring(email.length - 4, email.length) !== '.com'
        ) throw new InvalidParameterError("Email inválido");
        else if (!password) throw new InvalidParameterError("Senha vazia");
        else if (password.length < 6) throw new InvalidParameterError("Senha possui menos de 6 caracteres");
        else if (!password.match(/^[0-9]+$/)) throw new InvalidParameterError("Senha deve ser numérica");

        const id = this.idGenerator.generate();
        const hashedPassword = await this.hashManager.hash(password);

        const newUser = new User(
            id,
            email,
            hashedPassword
        )

        await this.usersRepository.save(newUser);

        const token = this.authenticator.generateToken({
            id: newUser.getId(),
            email: newUser.getEmail()
        });

        return token;
    }
}
