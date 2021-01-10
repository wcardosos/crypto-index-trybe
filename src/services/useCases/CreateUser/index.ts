import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController'
import { PostgresUsersRepository } from '../../repositories/Users/PostgresUsersRepository';
import { IdGenerator } from '../../tools/IdGenerator';
import { HashManager } from '../../tools/HashManager';
import { Authenticator } from '../../tools/Authenticator';

const usersRepository = new PostgresUsersRepository();
const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const authenticator = new Authenticator();

const createUserUseCase = new CreateUserUseCase(
    idGenerator,
    hashManager,
    authenticator,
    usersRepository
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };