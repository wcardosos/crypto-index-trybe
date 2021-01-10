import { LoginUserUseCase } from './LoginUserUseCase';
import { LoginUserController } from './LoginUserController'
import { PostgresUsersRepository } from '../../repositories/Users/PostgresUsersRepository';
import { IdGenerator } from '../../tools/IdGenerator';
import { HashManager } from '../../tools/HashManager';
import { Authenticator } from '../../tools/Authenticator';

const usersRepository = new PostgresUsersRepository();
const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const authenticator = new Authenticator();

const loginUserUseCase = new LoginUserUseCase(
    idGenerator,
    hashManager,
    authenticator,
    usersRepository
);

const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserUseCase, loginUserController };